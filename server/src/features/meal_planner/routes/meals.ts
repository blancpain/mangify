import express, { RequestHandler } from 'express';
import { mealsController } from '../controllers/mealsController';
import { isAuthenticated } from '@/middleware';

const mealsRouter = express.Router();
mealsRouter.get('/', isAuthenticated, mealsController.refreshMeals as RequestHandler);
mealsRouter.post(
  '/multi-day',
  isAuthenticated,
  mealsController.generateMultiDayMealPlan as RequestHandler,
);
mealsRouter.post(
  '/single-day',
  isAuthenticated,
  mealsController.generateSingleDayMealPlan as RequestHandler,
);
mealsRouter.post('/one-meal', isAuthenticated, mealsController.regenerateOneMeal as RequestHandler);

// NOTE: below two are saved for a future release
// second endpoint needs to be post!

// mealsRouter.get('/favorites', isAuthenticated, mealsController.saveMeal as RequestHandler);
// mealsRouter.get('/favorite', isAuthenticated, mealsController.getFavoriteMeals as RequestHandler);

export { mealsRouter };
