import axios from 'axios';
import { TComplexMealSearchSchema, MealRecipe, TRefreshMealSchema } from '@shared/types';
import {
  transformMealData,
  prisma,
  isNumber,
  findMeal,
  extractUserProfileId,
  transformMealDataForRefresh,
  extractUserProfile,
} from '@/utils';

// TODO: - for meals - we need to figure out how to store these and when to refresh them (do we clear all in the DB or not and if yes when etc?)
// TODO: - when getting meals also need to make sure that the meals are not in recipes to avoid...

const getMeals = async (id: string): Promise<MealRecipe[] | null> => {
  const { data } = await axios.get<TComplexMealSearchSchema>(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=1`,
  );

  const transformedData = transformMealData(data);

  if (!transformedData) {
    return null;
  }

  const userProfileId = await extractUserProfileId(id);

  if (!userProfileId) {
    return null;
  }

  const syncDb = async () => {
    await Promise.all(
      transformedData.map(async (meal) => {
        // HACK: - 1) check if a meal already exists - if it does just connect to the user profile
        // - 2) if it doesn't exist - we first extract all ingredients, removing duplicates
        // - 3) create the ingredients that don't already exist in the ingredients table
        // - 4) fetch all ingredients - ( created or existing ) that are part of this recipe and
        // - 5) connect all the ingredients to the meal
        // - 6) we create the meal with the associated ingredients and connect it to the user profile

        const existingMeal = await findMeal(Number(meal.id));

        if (existingMeal) {
          await prisma.profile.update({
            where: {
              id: userProfileId,
            },
            data: {
              meals: {
                // NOTE: can change properties as below if needed
                // create: {
                //   active: false
                // }
                connect: {
                  id: existingMeal.id,
                },
              },
            },
          });
        } else {
          const allIngredients = [
            ...new Set(
              (meal.ingredients ?? []).map((ingredient) => ({
                external_id: ingredient.id,
              })),
            ),
          ];

          await prisma.ingredients.createMany({
            data: allIngredients,
            skipDuplicates: true,
          });

          const createdIngredients = await prisma.ingredients.findMany({
            where: {
              external_id: {
                in: allIngredients.map((ingredient) => ingredient.external_id).filter(isNumber),
              },
            },
            select: { id: true },
          });

          const createdMeal = await prisma.meal.create({
            data: {
              // WARN: change active flag as needed...
              // active: true,
              profileId: userProfileId,
              recipe_external_id: meal.id,
              ingredients: {
                connect: createdIngredients,
              },
            },
          });

          await prisma.profile.update({
            where: {
              id: userProfileId,
            },
            data: {
              meals: {
                connect: {
                  id: createdMeal.id,
                },
              },
            },
          });
        }
      }),
    );
  };
  await syncDb();
  return transformedData;
};

const getMeal = async (id: string): Promise<MealRecipe | null> => {
  const { data } = await axios.get<TComplexMealSearchSchema>(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=1`,
  );

  const transformedData = transformMealData(data);

  if (!transformedData) {
    return null;
  }
  const meal = transformedData[0];

  const userProfileId = await extractUserProfileId(id);

  if (!userProfileId) {
    return null;
  }

  const syncDb = async () => {
    const existingMeal = await findMeal(Number(meal.id));

    if (existingMeal) {
      await prisma.profile.update({
        where: {
          id: userProfileId,
        },
        data: {
          meals: {
            // NOTE: can change properties as below if needed
            // create: {
            //   active: false
            // }
            connect: {
              id: existingMeal.id,
            },
          },
        },
      });
    } else {
      const allIngredients = [
        ...new Set(
          (meal.ingredients ?? []).map((ingredient) => ({
            external_id: ingredient.id,
          })),
        ),
      ];

      await prisma.ingredients.createMany({
        data: allIngredients,
        skipDuplicates: true,
      });

      const createdIngredients = await prisma.ingredients.findMany({
        where: {
          external_id: {
            in: allIngredients.map((ingredient) => ingredient.external_id).filter(isNumber),
          },
        },
        select: { id: true },
      });

      const createdMeal = await prisma.meal.create({
        data: {
          // WARN: change active flag as needed...
          // active: true,
          profileId: userProfileId,
          recipe_external_id: meal.id,
          ingredients: {
            connect: createdIngredients,
          },
        },
      });

      await prisma.profile.update({
        where: {
          id: userProfileId,
        },
        data: {
          meals: {
            connect: {
              id: createdMeal.id,
            },
          },
        },
      });
    }
  };
  await syncDb();

  return meal;
};

const refreshMeals = async (id: string): Promise<MealRecipe[] | null> => {
  const userProfileId = await extractUserProfileId(id);

  if (!userProfileId) return null;

  const userMealIds = await prisma.meal.findMany({
    where: {
      profileId: userProfileId,
      active: true,
    },
    select: {
      recipe_external_id: true,
    },
  });

  if (!userMealIds) return null;

  const { data } = await axios.get<TRefreshMealSchema[]>(
    `https://api.spoonacular.com/recipes/informationBulk?apiKey=${
      process.env.API_KEY
    }&ids=${userMealIds.map((meal) => meal.recipe_external_id)}&includeNutrition=true`,
  );

  const transformedData = transformMealDataForRefresh(data);

  if (!transformedData) return null;

  return transformedData;
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

  const transformedData = transformMealDataForRefresh(data);

  if (!transformedData) return null;

  return transformedData;
};

export const mealGeneratorService = { getMeals, getMeal, refreshMeals, saveMeal, getFavoriteMeals };
