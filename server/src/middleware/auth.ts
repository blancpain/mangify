import { NextFunction, Request, Response } from 'express';

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (user && user.disabled) {
    return res.status(401).json({ message: 'User is disabled, please contact admin' });
  }
  return next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const { user } = req.session;

  if (user && user.role === 'ADMIN') {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden' });
}
