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

// TODO: explain to users that calory and macro tartgets are approximations and that they can always increase/reduce dosage
// to meet the specific target...

// NOTE: breakfasts and snacks have much lower calories so we can't set calory or macro targets there
export const buildURL = (args: TBuildURL): string => {
  const caloriesTarget: number | null = args.calories
    ? Number(args.calories / args.numberOfMeals)
    : null;
  // NOTE: calories float is set as +100 and -400 (this is arbitrary at the moment but seems to produce steady results)
  // there aren't enough meals to also filter by macros at the moment
  const minCalories = caloriesTarget ? caloriesTarget - 300 : null;
  const maxCalories = caloriesTarget ? caloriesTarget + 100 : null;

  if (args.mealType === 'breakfast' || args.mealType === 'snack') {
    return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
      process.env.API_KEY
    }&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=${
      args.numberOfMeals
    }&diet=${args.diet?.toLowerCase()}&intolerances=${args.intolerances}&cuisine=${
      args.cuisine
    }&type=${args.mealType}`;
  }
  return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
    process.env.API_KEY
  }&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true&sort=random&number=${
    args.numberOfMeals
  }&diet=${args.diet?.toLowerCase()}&intolerances=${args.intolerances}&cuisine=${
    args.cuisine
  }&minCalories=${minCalories}&maxCalories=${maxCalories}&type=${args.mealType}`;
};
