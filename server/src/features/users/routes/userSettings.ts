import express, { RequestHandler } from 'express';
import { isAuthenticated } from '@/middleware';
import { userSettingsController } from '../controllers/userSettingsController';

const userSettingsRouter = express.Router();

userSettingsRouter.post(
  '/update-sex',
  isAuthenticated,
  userSettingsController.updateSex as RequestHandler,
);

export { userSettingsRouter };
