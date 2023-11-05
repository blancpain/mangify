export type ShowCaseRecipe = {
  extendedIngredients?: string[];
  title?: string | null;
  image?: string | null;
  calories?: number | null;
  dishType?: string | null;
  steps?: string[];
};

// Meal planning types for frontend

export type MealIngredients = {
  id?: number | null;
  ingredient?: string | null;
  ingredientImage?: string | null;
  amount?: number | null;
  unit?: string | null;
};

export type FullNutritionProfile = {
  calories?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fats?: number | null;
};

export type MealRecipe = {
  id?: number | null;
  uniqueIdentifier?: string | null;
  ingredients?: MealIngredients[];
  title?: string | null;
  image?: string | null;
  fullNutritionProfile?: FullNutritionProfile | null;
  directions?: string[];
  fullRecipeURL?: string | null;
  mealTypes?: string[] | null; // NOTE: since the API returns multiple meal types we probably need to check dynamically for breakfast or snack - the rest we can assume are main courses...
  date: Date | null;
};
