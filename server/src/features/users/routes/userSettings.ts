import express, { RequestHandler } from 'express';
import { isAuthenticated } from '@/middleware';
import { userSettingsController } from '../controllers/userSettingsController';

const userSettingsRouter = express.Router();

userSettingsRouter.post(
  '/sex',
  isAuthenticated as RequestHandler,
  userSettingsController.updateSex as RequestHandler,
);

userSettingsRouter.post(
  '/goal',
  isAuthenticated as RequestHandler,
  userSettingsController.updateGoal as RequestHandler,
);

userSettingsRouter.post(
  '/activity-level',
  isAuthenticated as RequestHandler,
  userSettingsController.updateActivity as RequestHandler,
);

userSettingsRouter.post(
  '/weight',
  isAuthenticated as RequestHandler,
  userSettingsController.updateWeight as RequestHandler,
);

userSettingsRouter.post(
  '/height',
  isAuthenticated as RequestHandler,
  userSettingsController.updateHeight as RequestHandler,
);

userSettingsRouter.post(
  '/age',
  isAuthenticated as RequestHandler,
  userSettingsController.updateAge as RequestHandler,
);

userSettingsRouter.post(
  '/number-of-meals',
  isAuthenticated as RequestHandler,
  userSettingsController.updateNumberOfMeals as RequestHandler,
);

userSettingsRouter.post(
  '/diet',
  isAuthenticated as RequestHandler,
  userSettingsController.updateDiet as RequestHandler,
);

userSettingsRouter.post(
  '/cuisines',
  isAuthenticated as RequestHandler,
  userSettingsController.updateCuisines as RequestHandler,
);

userSettingsRouter.post(
  '/intolerances',
  isAuthenticated as RequestHandler,
  userSettingsController.updateIntolerances as RequestHandler,
);

userSettingsRouter.post(
  '/calories',
  isAuthenticated as RequestHandler,
  userSettingsController.updateCalories as RequestHandler,
);

userSettingsRouter.post(
  '/protein',
  isAuthenticated as RequestHandler,
  userSettingsController.updateProtein as RequestHandler,
);

userSettingsRouter.post(
  '/fats',
  isAuthenticated as RequestHandler,
  userSettingsController.updateFats as RequestHandler,
);

userSettingsRouter.post(
  '/carbs',
  isAuthenticated as RequestHandler,
  userSettingsController.updateCarbs as RequestHandler,
);

export { userSettingsRouter };
