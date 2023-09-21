import { NextFunction, Request, Response } from 'express';
import { mealGeneratorService } from '../services/mealGeneratorService';

const getRecipes = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { numberOfMeals, type } = req.query;

  //* type casting here should be OK since frontend user inputs are hardcoded as number and string...
  const recipes = await mealGeneratorService.getRecipes(Number(numberOfMeals), type as string);
  if (recipes) {
    // avoid creating sessions for unlogged users
    req.session.destroy(() => {});
    res.json(recipes);
  } else {
    res.status(502).json({ errors: 'External service not responding' });
  }
};

export const mealGeneratorController = { getRecipes };
