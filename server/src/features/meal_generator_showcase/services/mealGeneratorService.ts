import axios from 'axios';
import { RecipeList } from '@shared/types';

//! below is currently hardcoded to return 1 item, for prod we need this to be a query depending on user input between 1-5
const getRecipes = async (): Promise<RecipeList[]> => {
  const { data } = await axios.get<RecipeList[]>(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=1`,
  );

  return data;
};

export const mealGeneratorService = { getRecipes };
