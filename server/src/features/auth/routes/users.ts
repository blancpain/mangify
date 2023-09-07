import express, { RequestHandler } from 'express';
import { userController } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', userController.getAll as RequestHandler);

// router.get('/:id', (req, res) => {});

// router.post('/', (req, res) => {});

// router.delete('/:id', (req, res) => {});

export { userRouter };
