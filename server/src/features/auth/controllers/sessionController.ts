import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '@shared/types';
import { sessionService } from '../services/sessionService';
import { Logger } from '@/lib';

const login = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  // eslint-disable-next-line prefer-destructuring
  const body: unknown = req.body;
  const result = loginSchema.safeParse(body);
  let zodErrors = {};

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    res.status(400).json({ errors: zodErrors });
  } else {
    const loggedUser = await sessionService.login(result.data);
    if (!loggedUser) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }
    req.session.user = {
      id: loggedUser.id,
      email: loggedUser.email,
      role: loggedUser.role,
      disabled: loggedUser.disabled,
    };
    req.session.save();
    res.status(200).send({ message: 'Successful login' });
  }
};

const logout = (req: Request, res: Response, _next: NextFunction): void => {
  req.session.destroy((err) => {
    if (err) {
      Logger.error('Error when destroying session');
    }
  });
  res.status(204).end();
};

export const sessionController = { login, logout };
