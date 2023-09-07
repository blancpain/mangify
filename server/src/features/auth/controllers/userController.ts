import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/userService';

const getAll = async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const allUsers = await userService.getAll();
  res.json(allUsers);
};

const getOne = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const user = await userService.getOne(id);
  res.json(user);
};

export const userController = { getAll, getOne };
