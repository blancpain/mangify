import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/userService';

const getAll = async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const allUsers = await userService.getAll();
  res.json(allUsers);
};

export const userController = { getAll };

//! Set up Winston & Morgan - look at guide.......commit as soon as this is set up since one route is ready
//! then commit on every route .e.g creating user, deleting user etc....
//! also considering setting up helmet middleware => should be good for security external shit can go in src/lib
