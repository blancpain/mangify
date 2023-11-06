import { NextFunction, Request, Response } from 'express';
import { signUpSchema } from '@/types';
import { userService } from '../services/userService';

const getAll = async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const allUsers = await userService.getAll();
  res.json(allUsers);
};

const getOne = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const user = await userService.getOne(id);
  if (!user) {
    res.status(404).json({ errors: 'user not found' });
    return;
  }
  res.json(user);
};

const addUser = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  // eslint-disable-next-line prefer-destructuring
  const body: unknown = req.body;
  const result = signUpSchema.safeParse(body);
  let zodErrors = {};

  // NOTE: we do not want to destroy the session in test or development mode as we aren't using a mock session
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') {
    // Avoid creating new sessions if there are errors
    req.session.destroy(() => {});
  }

  if (!result.success) {
    req.session.destroy(() => {});
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    res.status(400).json({ errors: zodErrors });
  } else {
    const savedUser = await userService.createUser(result.data);
    res.status(201).json(savedUser);
  }
};

const deleteUser = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const userToBeDeleted = await userService.deleteUser(id);

  if (!userToBeDeleted) {
    res.status(404).json({ errors: 'user not found' });
    return;
  }
  res.status(204).end();
};

export const userController = { getAll, getOne, addUser, deleteUser };
