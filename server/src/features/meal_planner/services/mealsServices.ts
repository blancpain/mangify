import axios from 'axios';
import { MealRecipe, TRefreshMealSchema, TSingleMealDate, TMultiMealDate } from '@shared/types';
import {
  prisma,
  extractUserProfileId,
  extractUserProfile,
  transformMealDateForFavoriteRecipes,
  getMealsFromCacheOrAPI,
  generateMeals,
} from '@/utils';

// TODO: add endpoint for re-generating a single meal

// NOTE: we should always take the weekStart as the starting point and count from there...
// if weekEnd is beyond the 7 days we can actually ignore it for the purpose of the below
// if not - we generate meals for the respective < 7 day period
// we also need to check if a meal already exists within this period and if so keep it as is
// (i.e. just skip that particular date so that we don't overwrite anything)
// we MUST associate a date with each meal, otherwise we don't be able to use them on the client side
const generateMultiDayMealPlan = async (
  id: string,
  dates: TMultiMealDate,
): Promise<MealRecipe[] | null> => {
  const userProfileId = await extractUserProfileId(id);

  if (!userProfileId) {
    return null;
  }

  console.log(dates.weekEnd, dates.weekStart);

  // const transformedData = transformMealData(data, currentDate);

  return null;
};

// TODO: ON re-generating a single meal - we should pass a type from the client to the server to check if breakfast/main/snack!!!
// since on first generation these will be determined anyway - endpoint still not implemented for singleMealRefresh...

const generateSingleDayMealPlan = async (
  id: string,
  date: TSingleMealDate,
): Promise<MealRecipe[] | null> => {
  const userProfile = await extractUserProfile(id);
  const { date: currentDate } = date;

  if (!userProfile) {
    return null;
  }

  const meals = generateMeals(userProfile, currentDate);

  return meals ?? null;
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
  generateMultiDayMealPlan,
  generateSingleDayMealPlan,
  refreshMeals,
  saveMeal,
  getFavoriteMeals,
};
