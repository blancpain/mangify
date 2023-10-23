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

  // const caloriesTarget: number | null = args.calories
  //   ? Number(args.calories / args.numberOfMeals)
  //   : null;
  // there aren't enough meals to also filter by macros at the moment
  // const minCalories = caloriesTarget ? caloriesTarget - 300 : null;
  // const maxCalories = caloriesTarget ? caloriesTarget + 100 : null;

  if (args.mealType === 'breakfast' || args.mealType === 'snack') {
    return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
      process.env.API_KEY
    }&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=${
      args.numberOfMeals
    }&diet=${args.diet?.toLowerCase()}&intolerances=${args.intolerances}&cuisine=${
      args.cuisine
    }&type=${args.mealType}`;
  }
  // NOTE: we introduce minCalories for the main courses to make sure we are actually getting main courses and not small snacks/meals
  // we also set maxCalories to ensure we aren't getting back meals that are overly calory dense
  return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
    process.env.API_KEY
  }&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=${
    args.numberOfMeals
  }&diet=${args.diet?.toLowerCase()}&intolerances=${args.intolerances}&cuisine=${
    args.cuisine
  }&minCalories=600&maxCalories=1000`;
};
