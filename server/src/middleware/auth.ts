import { NextFunction, Request, Response } from 'express';

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { user } = req.session;
  if (!user) {
    // below is to prevent a session being initialized if a request is unauthorized
    // we do this because express-session is configured to run as a "global" middleware for all endpoints ATM
    req.session.destroy(() => {});
    return res.status(401).json({ errors: 'Unauthorized' });
  }

  if (user && user.disabled) {
    req.session.destroy(() => {});
    return res.status(401).json({ errors: 'User is disabled, please contact admin' });
  }
  return next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const { user } = req.session;

  if (user && user.role === 'ADMIN') {
    return next();
  }
  req.session.destroy(() => {});
  return res.status(403).json({ errors: 'Forbidden' });
}
