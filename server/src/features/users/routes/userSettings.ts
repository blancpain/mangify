import express, { RequestHandler } from 'express';
import { isAuthenticated } from '@/middleware';
import { userSettingsController } from '../controllers/userSettingsController';

const userSettingsRouter = express.Router();

userSettingsRouter.post(
  '/sex',
  isAuthenticated,
  userSettingsController.updateSex as RequestHandler,
);

userSettingsRouter.post(
  '/goal',
  isAuthenticated,
  userSettingsController.updateGoal as RequestHandler,
);

userSettingsRouter.post(
  '/activity-level',
  isAuthenticated,
  userSettingsController.updateActivity as RequestHandler,
);

userSettingsRouter.post(
  '/weight',
  isAuthenticated,
  userSettingsController.updateWeight as RequestHandler,
);

userSettingsRouter.post(
  '/height',
  isAuthenticated,
  userSettingsController.updateHeight as RequestHandler,
);

userSettingsRouter.post(
  '/age',
  isAuthenticated,
  userSettingsController.updateAge as RequestHandler,
);

userSettingsRouter.post(
  '/number-of-meals',
  isAuthenticated,
  userSettingsController.updateNumberOfMeals as RequestHandler,
);

userSettingsRouter.post(
  '/diet',
  isAuthenticated,
  userSettingsController.updateDiet as RequestHandler,
);

userSettingsRouter.post(
  '/cuisines',
  isAuthenticated,
  userSettingsController.updateCuisines as RequestHandler,
);

userSettingsRouter.post(
  '/intolerances',
  isAuthenticated,
  userSettingsController.updateIntolerances as RequestHandler,
);
export { userSettingsRouter };
