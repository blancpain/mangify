import axios from 'axios';
import { MealRecipe, TRefreshMealSchema, TSingleMealDate, TMultiMealDate } from '@shared/types';
import {
  prisma,
  extractUserProfileId,
  extractUserProfile,
  transformMealDateForFavoriteRecipes,
  getMealsFromCacheOrAPI,
  generateMeals,
  generateWeekDateArray,
  // getUserMeals,
  // checkIfAllMealsHaveSameDate,
  dbDeactivateAllSingleDay,
  dbDeativateAll,
  cacheMealData,
  isNotTheSameDate,
} from '@/utils';
import { Logger } from '@/lib';

// TODO: add endpoint for re-generating a single meal
//  we should pass a type from the client to the server to check if breakfast/main/snack!!!
// since on first generation these will be determined anyway

// TODO:
// implement a way to NOT generate meals for a particular day if the user already has meals for that day
const generateMultiDayMealPlan = async (
  id: string,
  dates: TMultiMealDate,
): Promise<MealRecipe[] | null> => {
  const userProfile = await extractUserProfile(id);

  if (!userProfile) {
    return null;
  }

  const allMeals: MealRecipe[] = [];
  const { weekStart, weekEnd } = dates;
  const dateArray = generateWeekDateArray(weekStart, weekEnd);

  // NOTE: we check if all meals have the same date which means that we only hanve a single day meal plan
  // and can skip this date when generating the new meals

  // const currentMeals = await getUserMeals(userProfile.id);
  // const singleDayMealDate = checkIfAllMealsHaveSameDate(currentMeals);

  // NOTE: we use a generator function to ping the API sequentially for each date (if we use Promise.All instead we might get a unique constraint error)
  // on meal.id since we are pinging the API for all dates at the same time and the API might return the same meal for different dates
  async function* generateMealsForWeek() {
    // eslint-disable-next-line no-restricted-syntax
    for (const date of dateArray) {
      if (userProfile) {
        // eslint-disable-next-line no-await-in-loop
        yield await generateMeals(userProfile, date);
      }
    }
  }
  const mealsGenerator = generateMealsForWeek();

  // eslint-disable-next-line no-restricted-syntax
  for await (const meals of mealsGenerator) {
    if (meals) {
      allMeals.push(...meals);
    }
  }

  await dbDeativateAll(allMeals, userProfile.id);

  await cacheMealData(userProfile.id, allMeals);

  return allMeals;
};

// TODO:  we might need to introduce a limit of how many single-day meal plans a user can generate
const generateSingleDayMealPlan = async (
  id: string,
  date: TSingleMealDate,
): Promise<MealRecipe[] | null> => {
  const userProfile = await extractUserProfile(id);
  const { date: currentDate } = date;

  if (!userProfile) {
    return null;
  }

  // HACK: we deactivate all meals for the current date and then
  // fetch all of the user's meals (if any) and filter out the ones that are not for the current date
  // we then generate the new meals and
  // finally we merge the existing meals with the new ones and cache them
  // if no meals exist we simply generate new ones and cache them

  await dbDeactivateAllSingleDay(currentDate, userProfile.id);
  const allUserMeals = await getMealsFromCacheOrAPI(userProfile.id);

  if (allUserMeals) {
    const allUserMealsOutsideOfCurrentDate = allUserMeals.filter(isNotTheSameDate(currentDate));
    Logger.debug(allUserMealsOutsideOfCurrentDate.length);
    const meals = await generateMeals(userProfile, currentDate);
    if (!meals) return null;
    const finalMealList = [...allUserMealsOutsideOfCurrentDate, ...meals];
    Logger.debug(finalMealList);
    await cacheMealData(userProfile.id, finalMealList);
    return finalMealList;
  }

  // await dbDeactivateAllSingleDay(currentDate, userProfile.id);
  const meals = await generateMeals(userProfile, currentDate);
  if (!meals) return null;
  await cacheMealData(userProfile.id, meals);
  return meals;
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
