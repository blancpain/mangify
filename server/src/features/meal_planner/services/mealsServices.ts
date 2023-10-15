import axios from 'axios';
import { TComplexMealSearchSchema, MealRecipe, TRefreshMealSchema } from '@shared/types';
import {
  transformMealData,
  prisma,
  extractUserProfileId,
  extractUserProfile,
  syncMealsWithDb,
  fetchMeals,
  transformMealDateForFavoriteRecipes,
  cacheMealData,
  getMealsFromCacheOrAPI,
} from '@/utils';

// WARN: below is not operational ATM - will be refactored for multi-meal plans
const getMeals = async (id: string): Promise<MealRecipe[] | null> => {
  const { data } = await axios.get<TComplexMealSearchSchema>(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=1`,
  );

  const currentDate = new Date();

  const transformedData = transformMealData(data, currentDate);

  if (!transformedData) {
    return null;
  }

  const userProfileId = await extractUserProfileId(id);

  if (!userProfileId) {
    return null;
  }
  // await syncMealsWithDb(transformedData, userProfileId);

  return transformedData;
};

// NOTE: ON re-generating a single meal - we should pass a type from the client to the server to check if breakfast/main/snack!!!
// since on first generation these will be determined anyway - endpoint still not implemented for singleMealRefresh...

const generateSingleDayMealPlan = async (id: string): Promise<MealRecipe[] | null> => {
  // WARN: below returns local timezone - 2 in my case...Not sure we can ensure to always get accurate client timezone

  const userProfile = await extractUserProfile(id);

  if (!userProfile) {
    return null;
  }

  // NOTE: we add params from userProfile directly in the URLs
  const { meals_per_day: numberOfMealsToGenerate } = userProfile;

  const currentDate = new Date();

  const breakfastUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=1&type=breakfast`;
  const mainCoursesUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=2&type=main course`;
  const snackUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=1&type=snack`;

  // HACK: 2 meals = 2 main meals; 3 meals = 1 breakfast + 2 main meals; 4 meals = 1 breakfast + 2 mains + snack
  switch (numberOfMealsToGenerate) {
    case 2: {
      const mainCourses = await fetchMeals(mainCoursesUrl, currentDate);
      if (!mainCourses) return null;
      const allMeals = [...mainCourses];
      await syncMealsWithDb(allMeals, userProfile.id);
      // NOTE: we first delete any existing cache in redis for this user and then
      // we cache the data for 1 hour as per API guidelines (3600 seconds)
      await cacheMealData(userProfile.id, allMeals);
      return allMeals;
    }

    case 3: {
      const mainCourses = await fetchMeals(mainCoursesUrl, currentDate);
      const breakfast = await fetchMeals(breakfastUrl, currentDate);
      if (!mainCourses || !breakfast) return null;
      const allMeals = [...mainCourses, ...breakfast];
      await syncMealsWithDb(allMeals, userProfile.id);
      await cacheMealData(userProfile.id, allMeals);
      return allMeals;
    }

    case 4: {
      const mainCourses = await fetchMeals(mainCoursesUrl, currentDate);
      const breakfast = await fetchMeals(breakfastUrl, currentDate);
      const snack = await fetchMeals(snackUrl, currentDate);
      if (!mainCourses || !breakfast || !snack) return null;
      const allMeals = [...mainCourses, ...breakfast, ...snack];
      await syncMealsWithDb(allMeals, userProfile.id);
      await cacheMealData(userProfile.id, allMeals);
      return allMeals;
    }

    default:
      break;
  }
  return null;
};

const refreshMeals = async (id: string): Promise<MealRecipe[] | null> => {
  const userProfileId = await extractUserProfileId(id);

  if (!userProfileId) return null;

  const meals = await getMealsFromCacheOrAPI(userProfileId);

  if (!meals) return null;

  return meals;
};

const saveMeal = async (id: string, mealId: number): Promise<number[] | null> => {
  const userProfile = await extractUserProfile(id);

  if (!userProfile) return null;

  const userUpdatedFavoriteMeals = [...userProfile.favorite_recipes, mealId];

  await prisma.profile.update({
    where: {
      id: userProfile.id,
    },
    data: {
      favorite_recipes: userUpdatedFavoriteMeals,
    },
  });

  return userUpdatedFavoriteMeals;
};

// TODO: refactor as refresh meals above to use helper...
const getFavoriteMeals = async (id: string): Promise<MealRecipe[] | null> => {
  const userProfileId = await extractUserProfileId(id);

  if (!userProfileId) {
    return null;
  }

  const favoriteMeals = await prisma.profile.findMany({
    where: {
      id: userProfileId,
    },
    select: {
      favorite_recipes: true,
    },
  });

  const { data } = await axios.get<TRefreshMealSchema[]>(
    `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=${[
      ...favoriteMeals.map((meal) => meal.favorite_recipes),
    ]}&includeNutrition=true`,
  );
  const transformedData = transformMealDateForFavoriteRecipes(data);

  if (!transformedData) return null;

  return transformedData;
};

export const mealGeneratorService = {
  getMeals,
  generateSingleDayMealPlan,
  refreshMeals,
  saveMeal,
  getFavoriteMeals,
};
