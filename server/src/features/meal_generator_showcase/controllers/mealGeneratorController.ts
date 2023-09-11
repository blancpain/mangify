import { NextFunction, Request, Response } from 'express';
import { mealGeneratorService } from '../services/mealGeneratorService';

const getRecipes = async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const recipes = await mealGeneratorService.getRecipes();
  res.json(recipes);
};

export const mealGeneratorController = { getRecipes };
