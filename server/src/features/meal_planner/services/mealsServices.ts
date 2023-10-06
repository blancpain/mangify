import axios from 'axios';
import { TComplexMealSearchSchema, MealRecipe } from '@shared/types';
import { transformMealData, prisma, isNumber, findMeal } from '@/utils';

//! we also need a getMeal - singular - for when we just reload a single meal - only difference should be that we return a single recipe and not an array
// TODO - for meals - we need to figure out how to store these and when to refresh them (do we clear all in the DB or not and if yes when etc?)

const getMeals = async (id: string): Promise<MealRecipe[] | null> => {
  const { data } = await axios.get<TComplexMealSearchSchema>(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=1`,
  );

  const transformedData = transformMealData(data);

  if (!transformedData) {
    return null;
  }

  const userProfileId = await prisma.profile.findUnique({
    where: {
      userId: id,
    },
    select: {
      id: true,
    },
  });

  if (!userProfileId) {
    return null;
  }

  const syncDb = async () => {
    await Promise.all(
      transformedData.map(async (meal) => {
        // method - 1) check if a meal already exists - if it does just connect to the user profile
        // method - 2) if it doesn't exist - we first extract all ingredients, removing duplicates
        // method - 3) create the ingredients that don't already exist in the ingredients table
        // method - 4) fetch all ingredients - ( created or existing ) that are part of this recipe and
        // method - 5) connect all the ingredients to the meal
        // method - 6) we create the meal with the associated ingredients and connect it to the user profile

        const existingMeal = await findMeal(Number(meal.id));

        if (existingMeal) {
          await prisma.profile.update({
            where: {
              id: userProfileId.id,
            },
            data: {
              meals: {
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
              profileId: userProfileId?.id,
              recipe_external_id: meal.id,
              ingredients: {
                connect: createdIngredients,
              },
            },
          });

          await prisma.profile.update({
            where: {
              id: userProfileId.id,
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

const getMeal = async (email: string): Promise<MealRecipe | null> => {
  const { data } = await axios.get<TComplexMealSearchSchema>(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=1`,
  );

  const transformedData = transformMealData(data);

  if (!transformedData) {
    return null;
  }

  console.log(email);

  return transformedData[0];
};

export const mealGeneratorService = { getMeals, getMeal };
