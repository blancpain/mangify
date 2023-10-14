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
    res.status(502).json({ errors: 'Issue connecting to external service' });
  }
};

const generateSingleDayMealPlan = async (
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> => {
  const { user } = req.session;
  if (!user || !user.id) {
    res.status(401).json({ errors: 'Unauthorized' });
    return;
  }

  const data = await mealGeneratorService.generateSingleDayMealPlan(user.id);
  if (data) {
    res.json(data);
  } else {
    res.status(502).json({ errors: 'Issue connecting to external service' });
  }
};

const refreshMeals = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { user } = req.session;

  if (!user || !user.id) {
    res.status(401).json({ errors: 'Unauthorized' });
    return;
  }

  const data = await mealGeneratorService.refreshMeals(user.id);

  if (data) {
    res.json(data);
  } else {
    res.status(502).json({ errors: 'Issue connecting to external service' });
  }
};

const saveMeal = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { user } = req.session;

  if (!user || !user.id) {
    res.status(401).json({ errors: 'Unauthorized' });
    return;
  }

  // TODO: change below to a query param as currently hardcoded
  const data = await mealGeneratorService.saveMeal(user.id, 661250);

  if (data) {
    res.json(data);
  } else {
    res.status(502).json({ errors: 'Issue connecting to external service' });
  }
};

const getFavoriteMeals = async (
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> => {
  const { user } = req.session;

  if (!user || !user.id) {
    res.status(401).json({ errors: 'Unauthorized' });
    return;
  }

  const data = await mealGeneratorService.getFavoriteMeals(user.id);

  if (data) {
    res.json(data);
  } else {
    res.status(502).json({ errors: 'Issue connecting to external service' });
  }
};

export const mealsController = {
  getMeals,
  generateSingleDayMealPlan,
  refreshMeals,
  getFavoriteMeals,
  saveMeal,
};
