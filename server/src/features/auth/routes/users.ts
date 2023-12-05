import express, { RequestHandler } from 'express';
import { userController } from '../controllers/userController';
import { isAuthenticated, isAdmin } from '@/middleware';

const userRouter = express.Router();

userRouter.get(
  '/',
  isAuthenticated as RequestHandler,
  isAdmin,
  userController.getAll as RequestHandler,
);

userRouter.get(
  '/:id',
  isAuthenticated as RequestHandler,
  isAdmin,
  userController.getOne as RequestHandler,
);

userRouter.post('/', userController.addUser as RequestHandler);
userRouter.post('/google-signin', userController.googleSignIn as RequestHandler);
userRouter.post('/facebook-signin', userController.facebookSignIn as RequestHandler);

userRouter.delete(
  '/:id',
  isAuthenticated as RequestHandler,
  isAdmin,
  userController.deleteUser as RequestHandler,
);

export { userRouter };
