import axios from 'axios';
import { RecipeList, ShowCaseRecipe } from '@shared/types';
import { extractCalories } from '@/utils';

const getRecipes = async (
  numberOfMeals: number,
  type: string,
): Promise<ShowCaseRecipe[] | null> => {
  const { data } = await axios.get<RecipeList>(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=${numberOfMeals}&type=${type}`,
  );

  if (data.recipes) {
    const transformedData: ShowCaseRecipe[] = data.recipes.map((recipe) => ({
      //* below uses Set to remove duplicates and filters array to only return the ingredient names
      extendedIngredients: [
        ...new Set(
          recipe.extendedIngredients?.map((ingredient) =>
            ingredient.name ? ingredient.name.toString() : '',
          ),
        ),
      ],
      title: recipe.title,
      image: recipe.image,
      dishType: recipe.dishTypes?.[0],
      calories: recipe.summary ? extractCalories(recipe.summary) : null,
      steps: recipe.analyzedInstructions?.length
        ? [
            ...(recipe.analyzedInstructions?.[0].steps
              ? recipe.analyzedInstructions[0].steps.map((step) => (step.step ? step.step : ''))
              : ''),
          ]
        : [''],
    }));
    return transformedData;
  }
  return null;
};

export const mealGeneratorService = { getRecipes };
