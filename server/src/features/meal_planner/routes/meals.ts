import express, { RequestHandler } from 'express';
import { mealsController } from '../controllers/mealsController';
import { isAuthenticated } from '@/middleware';

// TODO: some of the below need to be post request not get...change last one especially

const mealsRouter = express.Router();
mealsRouter.post(
  '/multi-day',
  isAuthenticated,
  mealsController.generateMultiDayMealPlan as RequestHandler,
);
mealsRouter.post(
  '/single',
  isAuthenticated,
  mealsController.generateSingleDayMealPlan as RequestHandler,
);
mealsRouter.get('/refresh', isAuthenticated, mealsController.refreshMeals as RequestHandler);
mealsRouter.get('/favorites', isAuthenticated, mealsController.saveMeal as RequestHandler);
mealsRouter.get('/favorite', isAuthenticated, mealsController.getFavoriteMeals as RequestHandler);

export { mealsRouter };
