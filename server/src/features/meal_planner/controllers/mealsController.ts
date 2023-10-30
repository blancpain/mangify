import { NextFunction, Request, Response } from 'express';
import {
  MultiMealDateSchema,
  OneMealRegenerationSchema,
  SingleDayMealDateSchema,
} from '@shared/types';
import { mealGeneratorService } from '../services/mealsServices';

const generateMultiDayMealPlan = async (
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> => {
  const { user } = req.session;

  if (!user || !user.id) {
    res.status(401).json({ errors: 'Unauthorized' });
    return;
  }
  // eslint-disable-next-line prefer-destructuring
  const body: unknown = req.body;
  const result = MultiMealDateSchema.safeParse(body);
  let zodErrors = {};

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    res.status(400).json({ errors: zodErrors });
  } else {
    const data = await mealGeneratorService.generateMultiDayMealPlan(user.id, result.data);
    if (data) {
      res.json(data);
    } else {
      res.status(502).json({ errors: 'Issue connecting to external service' });
    }
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
  // eslint-disable-next-line prefer-destructuring
  const body: unknown = req.body;
  const result = SingleDayMealDateSchema.safeParse(body);
  let zodErrors = {};

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    res.status(400).json({ errors: zodErrors });
  } else {
    const data = await mealGeneratorService.generateSingleDayMealPlan(user.id, result.data);
    if (data) {
      res.json(data);
    } else {
      res.status(502).json({ errors: 'Issue connecting to external service' });
    }
  }
};

const regenerateOneMeal = async (
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> => {
  const { user } = req.session;
  if (!user || !user.id) {
    res.status(401).json({ errors: 'Unauthorized' });
    return;
  }
  // eslint-disable-next-line prefer-destructuring
  const body: unknown = req.body;
  const result = OneMealRegenerationSchema.safeParse(body);
  let zodErrors = {};

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    res.status(400).json({ errors: zodErrors });
  } else {
    const data = await mealGeneratorService.regenerateOneMeal(user.id, result.data);
    if (data) {
      res.json(data);
    } else {
      res.status(502).json({ errors: 'Issue connecting to external service' });
    }
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

// WARN: saveMeal and getFavoriteMeals are not currently in use, saved for a later release
const saveMeal = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { user } = req.session;

  if (!user || !user.id) {
    res.status(401).json({ errors: 'Unauthorized' });
    return;
  }

  // WARN: change below to a query param as currently hardcoded
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
  generateMultiDayMealPlan,
  generateSingleDayMealPlan,
  refreshMeals,
  regenerateOneMeal,
  getFavoriteMeals,
  saveMeal,
};
