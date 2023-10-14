// TODO: bring some of the below funcs outside of module...
import { Prisma } from '@prisma/client';
import {
  FullUserProfile,
  MealRecipe,
  TComplexMealSearchSchema,
  TRefreshMealSchema,
  ZodSchemaGenericWrapper,
} from '@shared/types';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { prisma } from './postgres';

// type guards
export const isNumber = (input: unknown): input is number => typeof input === 'number';

export const isObjectWithKey = <T, K extends keyof T>(obj: unknown, key: K): obj is T =>
  typeof obj === 'object' && obj !== null && key in obj;

export const extractCalories = (input: string): number | null => {
  const regex = /<b>(\d+)\s*calories<\/b>/i;
  const match = input.match(regex);

  if (match) {
    return Number(match[1].trim());
  }
  return null;
};

export const processUpdate = async <T>(
  req: Request,
  res: Response,
  _next: NextFunction,
  schema: ZodSchemaGenericWrapper<T>,
  updateFunction: (email: string, data: T) => Promise<void>,
): Promise<void> => {
  const { user } = req.session;

  if (!user || !user.email) {
    res.status(400).json({ errors: 'Unauthorised' });
    return;
  }

  // eslint-disable-next-line prefer-destructuring
  const body: unknown = req.body;
  const result = schema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    res.status(400).json({ errors: zodErrors });
    return;
  }

  await updateFunction(user.email, result.data);
  res.status(200).json(result.data);
};

export const transformMealData = (
  data: TComplexMealSearchSchema,
  mealDate: Date,
): MealRecipe[] | null => {
  if (data.results) {
    const transformedData: MealRecipe[] = data.results.map((recipe) => ({
      id: recipe.id,
      ingredients: recipe.extendedIngredients?.map((ingredient) => ({
        id: ingredient.id,
        ingredient: ingredient.name ? ingredient.name.toString() : '',
        ingredientImage: ingredient.image,
        amount: ingredient.measures?.metric?.amount,
        unit: ingredient.measures?.metric?.unitShort,
      })),
      title: recipe.title,
      image: recipe.image,
      date: mealDate,
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
      directions: [
        ...(recipe.analyzedInstructions?.[0].steps
          ? recipe.analyzedInstructions[0].steps.map((step) => (step.step ? step.step : ''))
          : ''),
      ],
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
  if (!userMeals || !userMeals.meals) return null;
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
      date: userMeals.meals.filter((meal) => meal.recipe_external_id === recipe.id)[0].day,
      fullNutritionProfile: {
        calories: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Calories')
          ?.amount,
        protein: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Protein')
          ?.amount,
        fats: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Fat')?.amount,
        carbs: recipe.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Carbohydrates')
          ?.amount,
      },
      directions: [
        ...(recipe.analyzedInstructions?.[0].steps
          ? recipe.analyzedInstructions[0].steps.map((step) => (step.step ? step.step : ''))
          : ''),
      ],
      fullRecipeURL: recipe.spoonacularSourceUrl,
    }));
    return transformedData;
  }
  return null;
};

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
      directions: [
        ...(recipe.analyzedInstructions?.[0].steps
          ? recipe.analyzedInstructions[0].steps.map((step) => (step.step ? step.step : ''))
          : ''),
      ],
      fullRecipeURL: recipe.spoonacularSourceUrl,
    }));
    return transformedData;
  }
  return null;
};

// this is the UserMeal type but we need to spread it out for the function to work as overlaps on utility types not allowed
export const findMeal = async (
  mealId: number,
): Promise<{
  id: string;
  recipe_external_id: number | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  profileId: string;
} | null> => {
  const meal = await prisma.meal.findUnique({
    where: {
      recipe_external_id: mealId,
    },
  });
  if (!meal) return null;
  return meal;
};

export const extractUserProfileId = async (userId: string): Promise<string | null> => {
  const userProfileId = await prisma.profile.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  if (userProfileId) return userProfileId.id;
  return null;
};

export const extractUserProfile = async (userId: string): Promise<FullUserProfile | null> => {
  const userProfile = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });

  if (userProfile) return userProfile;
  return null;
};

export const extractUserIdFromEmail = async (email: string): Promise<string | null> => {
  const userId = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (userId) return userId.id;
  return null;
};

export const getUserMeals = async (id: string) => {
  const userMeals = await prisma.profile.findUnique({
    where: {
      id,
    },
    select: {
      meals: {
        select: {
          active: true,
          recipe_external_id: true,
          day: true,
        },
      },
    },
  });
  return userMeals;
};

export type TUserMeals = Prisma.PromiseReturnType<typeof getUserMeals>;

export const fetchMeals = async (URL: string, mealDate: Date): Promise<MealRecipe[] | null> => {
  const { data } = await axios.get<TComplexMealSearchSchema>(URL);

  const transformedData = transformMealData(data, mealDate);

  return transformedData || null;
};

// NOTE: we first deactivate all meals in the user profile and only activate the newly fetched ones
// this way we can easily fetch the active meals at the client level
//
export const syncMealsWithDb = async (transformedMealData: MealRecipe[], userId: string) => {
  await prisma.profile.update({
    where: {
      id: userId,
    },
    data: {
      meals: {
        updateMany: {
          where: {
            active: true,
          },
          data: {
            active: false,
          },
        },
      },
    },
  });

  await Promise.all(
    transformedMealData.map(async (meal) => {
      // HACK:
      // - 1) check if a meal already exists - if it does just connect to the user profile
      // - 2) if it doesn't exist - we first extract all ingredients, removing duplicates
      // - 3) create the ingredients that don't already exist in the ingredients table
      // - 4) fetch all ingredients - ( created or existing ) that are part of this recipe and
      // - 5) connect all the ingredients to the meal
      // - 6) we create the meal with the associated ingredients and connect it to the user profile

      const existingMeal = await findMeal(Number(meal.id));

      if (existingMeal) {
        await prisma.profile.update({
          where: {
            id: userId,
          },
          data: {
            meals: {
              // NOTE: can change properties as below if needed, i.e. active flag
              create: {
                active: true,
              },
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
            day: meal.date,
            active: true,
            profileId: userId,
            recipe_external_id: meal.id,
            ingredients: {
              connect: createdIngredients,
            },
          },
        });

        await prisma.profile.update({
          where: {
            id: userId,
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
