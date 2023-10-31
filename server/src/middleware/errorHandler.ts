import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import { Logger } from '@/lib';

//! TODO: add handling for more status codes Prisma + different axios errors?

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    Logger.error(err.code);
    // NOTE: we do not want to destroy the session in test or development mode as we aren't using a mock session
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') {
      // Avoid creating new sessions if there are errors
      req.session.destroy(() => {});
    }
    //* duplicate values (unique constraint violated)
    if (err.code === 'P2002') {
      // ? avoid revealing if email is taken
      return res.status(400).json({ errors: 'Invalid username or password' });
    }
    //* data not found
    if (err.code === 'P2015' || err.code === 'P2018' || err.code === 'P2025') {
      return res.status(400).json({ errors: 'Record(s) not found' });
    }
  } else if (err instanceof AxiosError) {
    return res.status(502).json({ errors: 'Unable to reach external service' });
  }

  res.status(500).json({ errors: 'Something went wrong' });

  return next(err);
};
