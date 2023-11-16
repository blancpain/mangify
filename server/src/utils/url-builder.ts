export type TBuildURL = {
  mealType: string;
  numberOfMeals: number;
  diet: string | null;
  intolerances: string[] | null;
  cuisine: string[] | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fats: number | null;
};

// NOTE: breakfasts and snacks have much lower calories so we can't set calory or macro targets there
export const buildURL = (args: TBuildURL): string => {
  // NOTE: using calory/macro targets does not produce very accurate results using the current API so we will let the user regenerate the meal(s) if they don't like them
  // we still show they targets and the meal data for informational purposes
  if (args.mealType === 'breakfast' || args.mealType === 'snack') {
    return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
      process.env.API_KEY
    }&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=${
      args.numberOfMeals
    }&diet=${args.diet?.toLowerCase()}&intolerances=${args.intolerances}&cuisine=${
      args.cuisine
    }&type=${args.mealType}`;
  }
  // NOTE: we add minCalories to ensure we actually get main courses
  return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
    process.env.API_KEY
  }&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=${
    args.numberOfMeals
  }&diet=${args.diet?.toLowerCase()}&intolerances=${args.intolerances}&cuisine=${
    args.cuisine
  }&type=${args.mealType}&minCalories=600`;
};
