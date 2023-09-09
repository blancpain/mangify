import express, { RequestHandler } from 'express';
import { userController } from '../controllers/userController';
import { isAuthenticated, isAdmin } from '@/middleware';

const userRouter = express.Router();

userRouter.get('/', isAuthenticated, isAdmin, userController.getAll as RequestHandler);

userRouter.get('/:id', isAuthenticated, isAdmin, userController.getOne as RequestHandler);

userRouter.post('/', userController.addUser as RequestHandler);

userRouter.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser as RequestHandler);

export { userRouter };
