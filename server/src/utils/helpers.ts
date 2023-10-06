import { Request, Response, NextFunction } from 'express';
import { MealRecipe, TComplexMealSearchSchema, ZodSchemaGenericWrapper } from '@shared/types';
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

export const parseUpdate = async <T>(
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
  res.status(200).json({ message: 'OK' });
};

export const transformMealData = (data: TComplexMealSearchSchema): MealRecipe[] | null => {
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
