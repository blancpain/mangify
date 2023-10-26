import {
  FullUserProfile,
  MealRecipe,
  TComplexMealSearchSchema,
  TRefreshMealSchema,
  MealIngredients,
} from '@shared/types';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { TUserMeals, getUserMeals, syncMealsWithDb } from './db';
import { TBuildURL, buildURL } from './url-builder';
import { cacheMealData, redisClient } from './redis';
import { lowerCaseFirstLetter } from './strings';
import { Logger } from '@/lib';
import { removeDuplicatesFromArrayOfObjects } from './helpers';

// NOTE: we use a unique identifier for the meals (nanoid) that we update on new meal gen or on refresh
// to ensure that the client and server and in sync and to ensure we can target a meal correctly for update/deletion
// from the client
export const transformMealData = (
  data: TComplexMealSearchSchema,
  mealDate: Date,
): MealRecipe[] | null => {
  if (data.results) {
    const transformedData: MealRecipe[] = data.results.map((recipe) => ({
      id: recipe.id,
      // NOTE: type assertion below
      ingredients: removeDuplicatesFromArrayOfObjects(
        recipe.extendedIngredients?.map((ingredient) => ({
          id: ingredient.id,
          ingredient: ingredient.name ? ingredient.name.toString() : '',
          ingredientImage: ingredient.image,
          amount: ingredient.measures?.metric?.amount,
          unit: ingredient.measures?.metric?.unitShort,
        })) as MealIngredients[],
        'id',
      ),
      title: recipe.title,
      image: recipe.image,
      date: mealDate,
      uniqueIdentifier: nanoid(),
      mealTypes: recipe.dishTypes,
      fullNutritionProfile: {
        calories: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Calories')
          ?.amount,
        protein: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Protein')
          ?.amount,
        fats: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Fat')?.amount,
        carbs: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Carbohydrates')
          ?.amount,
      },
      directions: recipe.analyzedInstructions?.length
        ? [
            ...(recipe.analyzedInstructions?.[0].steps
              ? recipe.analyzedInstructions[0].steps.map((step) => (step.step ? step.step : ''))
              : ''),
          ]
        : [''],
      fullRecipeURL: recipe.spoonacularSourceUrl,
    }));
    return transformedData;
  }
  return null;
};

export const transformMealDataForRefresh = (
  data: TRefreshMealSchema[],
  userMeals: TUserMeals,
): MealRecipe[] | null => {
  if (!userMeals) return null;
  if (data) {
    const transformedData: MealRecipe[] = data.map((recipe) => ({
      id: recipe.id,
      ingredients: recipe.extendedIngredients?.map((ingredient) => ({
        id: ingredient.id,
        ingredient: ingredient.name ? ingredient.name.toString() : '',
        ingredientImage: ingredient.image,
        amount: ingredient.measures?.metric?.amount,
        unit: ingredient.measures?.metric?.unitShort,
      })),
      title: recipe.title,
      mealTypes: recipe.dishTypes,
      image: recipe.image,
      uniqueIdentifier: nanoid(),
      date: userMeals.filter((meal) => meal.recipe_external_id === recipe.id)[0].day,
      fullNutritionProfile: {
        calories: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Calories')
          ?.amount,
        protein: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Protein')
          ?.amount,
        fats: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Fat')?.amount,
        carbs: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Carbohydrates')
          ?.amount,
      },
      directions: recipe.analyzedInstructions?.length
        ? [
            ...(recipe.analyzedInstructions?.[0].steps
              ? recipe.analyzedInstructions[0].steps.map((step) => (step.step ? step.step : ''))
              : ''),
          ]
        : [''],
      fullRecipeURL: recipe.spoonacularSourceUrl,
    }));
    return transformedData;
  }
  return null;
};

// WARN: currently below is not in use as planned for future release
export const transformMealDateForFavoriteRecipes = (
  data: TRefreshMealSchema[],
): MealRecipe[] | null => {
  if (data) {
    const transformedData: MealRecipe[] = data.map((recipe) => ({
      id: recipe.id,
      ingredients: recipe.extendedIngredients?.map((ingredient) => ({
        id: ingredient.id,
        ingredient: ingredient.name ? ingredient.name.toString() : '',
        ingredientImage: ingredient.image,
        amount: ingredient.measures?.metric?.amount,
        unit: ingredient.measures?.metric?.unitShort,
      })),
      title: recipe.title,
      mealTypes: recipe.dishTypes,
      image: recipe.image,
      uniqueIdentifier: nanoid(),
      date: new Date(),
      fullNutritionProfile: {
        calories: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Calories')
          ?.amount,
        protein: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Protein')
          ?.amount,
        fats: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Fat')?.amount,
        carbs: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Carbohydrates')
          ?.amount,
      },
      directions: recipe.analyzedInstructions?.length
        ? [
            ...(recipe.analyzedInstructions?.[0].steps
              ? recipe.analyzedInstructions[0].steps.map((step) => (step.step ? step.step : ''))
              : ''),
          ]
        : [''],
      fullRecipeURL: recipe.spoonacularSourceUrl,
    }));
    return transformedData;
  }
  return null;
};

export const fetchMeals = async (URL: string, mealDate: Date): Promise<MealRecipe[] | null> => {
  const { data } = await axios.get<TComplexMealSearchSchema>(URL);
  const date = new Date(mealDate);

  const transformedData = transformMealData(data, date);

  return transformedData || null;
};

export const generateOneMeal = async (
  userProfile: FullUserProfile,
  date: Date,
  mealType: string,
): Promise<MealRecipe[] | null> => {
  const {
    diet,
    fats,
    carbs,
    protein,
    calories,
    intolerances,
    favorite_cuisines: favoriteCuisines,
  } = userProfile;

  const mealUrlDetails: TBuildURL = {
    // NOTE: we run the helper string func because meal type on the client is capitalized
    mealType: lowerCaseFirstLetter(mealType),
    numberOfMeals: 1,
    diet,
    intolerances,
    cuisine: favoriteCuisines,
    calories,
    protein,
    carbs,
    fats,
  };
  const mealUrl = buildURL(mealUrlDetails);

  const meal = await fetchMeals(mealUrl, date);
  if (!meal) return null;
  return meal;
};

export const generateMeals = async (
  userProfile: FullUserProfile,
  date: Date,
): Promise<MealRecipe[] | null> => {
  const {
    meals_per_day: numberOfMealsToGenerate,
    diet,
    fats,
    carbs,
    protein,
    calories,
    intolerances,
    favorite_cuisines: favoriteCuisines,
  } = userProfile;

  // HACK: 2 meals = 2 main meals; 3 meals = 1 breakfast + 2 main meals; 4 meals = 1 breakfast + 2 mains + snack
  switch (numberOfMealsToGenerate) {
    case 2: {
      const mainCourseUrlDetails: TBuildURL = {
        mealType: 'main course',
        numberOfMeals: 2,
        diet,
        intolerances,
        cuisine: favoriteCuisines,
        calories,
        protein,
        carbs,
        fats,
      };
      const mainCoursesUrl = buildURL(mainCourseUrlDetails);
      const mainCourses = await fetchMeals(mainCoursesUrl, date);
      if (!mainCourses) return null;
      const allMeals = [...mainCourses];
      return allMeals;
    }

    case 3: {
      const mainCourseUrlDetails: TBuildURL = {
        mealType: 'main course',
        numberOfMeals: 2,
        diet,
        intolerances,
        cuisine: favoriteCuisines,
        calories,
        protein,
        carbs,
        fats,
      };
      const mainCoursesUrl = buildURL(mainCourseUrlDetails);
      const mainCourses = await fetchMeals(mainCoursesUrl, date);

      const breakfastUrlDetails: TBuildURL = {
        mealType: 'breakfast',
        numberOfMeals: 1,
        diet,
        intolerances,
        cuisine: favoriteCuisines,
        calories,
        protein,
        carbs,
        fats,
      };
      const breakfastUrl = buildURL(breakfastUrlDetails);
      const breakfast = await fetchMeals(breakfastUrl, date);
      if (!mainCourses || !breakfast) return null;
      const allMeals = [...mainCourses, ...breakfast];

      return allMeals;
    }

    case 4: {
      const mainCourseUrlDetails: TBuildURL = {
        mealType: 'main course',
        numberOfMeals: 2,
        diet,
        intolerances,
        cuisine: favoriteCuisines,
        calories,
        protein,
        carbs,
        fats,
      };
      const mainCoursesUrl = buildURL(mainCourseUrlDetails);
      const mainCourses = await fetchMeals(mainCoursesUrl, date);
      // await timeout(1000);

      const breakfastUrlDetails: TBuildURL = {
        mealType: 'breakfast',
        numberOfMeals: 1,
        diet,
        intolerances,
        cuisine: favoriteCuisines,
        calories,
        protein,
        carbs,
        fats,
      };
      const breakfastUrl = buildURL(breakfastUrlDetails);
      const breakfast = await fetchMeals(breakfastUrl, date);

      const snackUrlDetails: TBuildURL = {
        mealType: 'snack',
        numberOfMeals: 1,
        diet,
        intolerances,
        cuisine: favoriteCuisines,
        calories,
        protein,
        carbs,
        fats,
      };
      const snackUrl = buildURL(snackUrlDetails);
      const snack = await fetchMeals(snackUrl, date);
      if (!mainCourses || !breakfast || !snack) return null;
      const allMeals = [...mainCourses, ...breakfast, ...snack];
      return allMeals;
    }

    default:
      break;
  }
  return null;
};

export const getMealsFromCacheOrAPI = async (
  userProfileId: string,
): Promise<MealRecipe[] | null> => {
  const cachedMeals: string | null = await redisClient.get(userProfileId);

  if (cachedMeals) {
    // WARN: check if type assumption is OK?
    const parsedCachedMeals = JSON.parse(cachedMeals) as MealRecipe[];
    Logger.debug('we should only be seeing this if there is a cache hit. The meals:');
    Logger.debug(parsedCachedMeals.map((meal) => meal.id));
    Logger.debug('Length of meals:');
    Logger.debug(parsedCachedMeals.length);
    return parsedCachedMeals;
  }

  Logger.debug('is cached meals null?');
  Logger.debug(cachedMeals);
  const userMeals = await getUserMeals(userProfileId);

  if (!userMeals || (userMeals && userMeals.length === 0)) return null;

  Logger.debug('We should only be seeing this if there is a cache miss. Length of meals from DB:');
  Logger.debug(userMeals.length);
  Logger.debug('Meals from DB:');
  Logger.debug(userMeals.map((meal) => meal.recipe_external_id));

  const { data } = await axios.get<TRefreshMealSchema[]>(
    `https://api.spoonacular.com/recipes/informationBulk?apiKey=${
      process.env.API_KEY
    }&ids=${userMeals.map((meal) => meal.recipe_external_id)}&includeNutrition=true`,
  );

  const transformedData = transformMealDataForRefresh(data, userMeals);
  if (!transformedData) return null;

  Logger.debug(
    'Length of meals after transform - this is the final list that goes to client and for db sync and caching:',
  );
  Logger.debug(userMeals.length);
  Logger.debug('And the data:');
  Logger.debug(transformedData.map((meal) => meal.id));

  // NOTE: we sync the DB with the new unique identifiers for the meals
  // we do this because after 1 hour we lose our cache and since we introduce the unique identifier when we transform the data
  // we can't use the old identifier to target the meal
  await syncMealsWithDb(transformedData, userProfileId);

  // NOTE: since redis caching is normally triggered when we fetch meals
  // we need to add the below in the cases where we haven't regenerated but are within the 1 hour cache window
  // and don't want to re-fetch again on refresh
  await cacheMealData(userProfileId, transformedData);

  return transformedData;
};

// NOTE: helper to fetch from cache or API - used for one-meal regeneration - we have different versions in order to still be able to use
// the cache and only exclude the meal that is being regenerated (instead of having to re-fetch all meals from the API)
export const getMealsFromCacheOrAPIForOneMealRegeneration = async (
  userProfileId: string,
  uniqueIdentifierOfMealToBeRemoved: string,
): Promise<MealRecipe[] | null> => {
  const cachedMeals: string | null = await redisClient.get(userProfileId);

  if (cachedMeals) {
    const parsedCachedMeals = JSON.parse(cachedMeals) as MealRecipe[];
    return parsedCachedMeals.filter(
      (meal) => meal.uniqueIdentifier !== uniqueIdentifierOfMealToBeRemoved,
    );
  }

  const userMeals = await getUserMeals(userProfileId);

  if (!userMeals || (userMeals && userMeals.length === 0)) return null;

  const { data } = await axios.get<TRefreshMealSchema[]>(
    `https://api.spoonacular.com/recipes/informationBulk?apiKey=${
      process.env.API_KEY
    }&ids=${userMeals.map((meal) => meal.recipe_external_id)}&includeNutrition=true`,
  );

  const transformedData = transformMealDataForRefresh(data, userMeals);
  if (!transformedData) return null;

  await syncMealsWithDb(transformedData, userProfileId);
  await cacheMealData(userProfileId, transformedData);

  return transformedData;
};
