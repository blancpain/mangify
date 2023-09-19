import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@/lib';

//! TODO: add handling for more status codes Prisma + failed food API calls

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error(err);
  Logger.error(err.message);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // avoid creating new sessions if there are errors
    req.session.destroy(() => {});
    if (err.code === 'P2002') {
      // ? avoid revealing if email is taken
      return res.status(400).json({ errors: 'Invalid username or password' });
    }
  }

  //! catch-all below if none of the paths are successful
  //! - decide if this should be kept or not? We never go to next() as is?
  res.status(500).json({ errors: 'Something went wrong' });

  return next(err);
};
