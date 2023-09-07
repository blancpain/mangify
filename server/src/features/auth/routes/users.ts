import express, { RequestHandler } from 'express';
import { userController } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', userController.getAll as RequestHandler);

userRouter.get('/:id', userController.getOne as RequestHandler);

userRouter.post('/', userController.addUser as RequestHandler);

// router.delete('/:id', (req, res) => {});

export { userRouter };
