import { NextFunction, Request, Response } from 'express';
import { mealGeneratorService } from '../services/mealsServices';

const getMeals = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { user } = req.session;

  if (!user || !user.id) {
    res.status(401).json({ errors: 'Unauthorized' });
    return;
  }

  const data = await mealGeneratorService.getMeals(user.id);
  if (data) {
    res.json(data);
  } else {
    res.status(502).json({ errors: 'External service not responding' });
  }
};

const getMeal = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { user } = req.session;

  if (!user || !user.id) {
    res.status(401).json({ errors: 'Unauthorized' });
    return;
  }

  const data = await mealGeneratorService.getMeals(user.id);

  if (data) {
    res.json(data);
  } else {
    res.status(502).json({ errors: 'External service not responding' });
  }
};

export const mealsController = { getMeals, getMeal };
