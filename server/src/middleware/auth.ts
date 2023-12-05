import { NextFunction, Request, Response } from 'express';
import { auth } from 'firebase-admin';
import { extractUserIdFromEmail } from '@/utils';

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const firebaseSessionCookie = req.cookies.firebaseSession as string;
  if (firebaseSessionCookie) {
    const decodedToken = await auth().verifySessionCookie(firebaseSessionCookie, true);
    const { email } = decodedToken;

    if (!email) {
      return res.status(401).json({ errors: 'Unauthorized' });
    }

    const userInDB = await extractUserIdFromEmail(email);

    if (userInDB) {
      req.userId = userInDB;
      return next();
    }

    return res.status(401).json({ errors: 'Unauthorized' });
  }

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
  req.userId = user.id;
  return next();
}

// WARN: below is not currently being used; needs to be updated to include firebase auth as well if/when functional
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const { user } = req.session;

  if (user && user.role === 'ADMIN') {
    return next();
  }
  req.session.destroy(() => {});
  return res.status(403).json({ errors: 'Forbidden' });
}
