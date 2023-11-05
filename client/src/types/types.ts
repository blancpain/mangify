import { MealRecipe, MealIngredients } from 'mangify-shared-types';

export type CalendarState = {
  day: boolean;
  weekRange: [string, string];
  singleDayDate: string | null;
};

export type ShoppingListItem = {
  meal: string; // the unique identifier for the meal
  ingredients: MealIngredients[];
};

export type ShoppingListState = {
  shoppingList: ShoppingListItem[] | [];
};

export type MealsState = {
  meals: MealRecipe[] | null;
};

export type NutritionMacros = {
  protein: number;
  fats: number;
  carbs: number;
};

export type NutritionProfile = {
  calories: number | null;
  macros: NutritionMacros | null;
};
