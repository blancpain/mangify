import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '@shared/types';
import { sessionService } from '../services/sessionService';

//! ATM every request creates a new token (because im including the middleware globally)
//! we need to check the session at every request - move this to a middleware func to see if correct user or if user logged out
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
    req.session.user = { id: loggedUser.id, email: loggedUser.email };
    req.session.save();
    res.status(200).send({ message: 'successful login' });
  }
};

export const sessionController = { login };

//! destroy any previous sessions w/ req.session.destroy() ?
