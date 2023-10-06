import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '@shared/types';
import { sessionService } from '../services/sessionService';
import { Logger } from '@/lib';
import { prisma } from '@/utils';
// import { prisma } from '@/utils';

const login = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  // eslint-disable-next-line prefer-destructuring
  const body: unknown = req.body;
  const result = loginSchema.safeParse(body);
  let zodErrors = {};

  if (!result.success) {
    req.session.destroy(() => {});
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    res.status(400).json({ errors: zodErrors });
  } else {
    const loggedUser = await sessionService.login(result.data);
    if (!loggedUser) {
      req.session.destroy(() => {});
      res.status(401).json({ errors: 'Invalid email or password' });
      return;
    }
    if (loggedUser.disabled) {
      req.session.destroy(() => {});
      res.status(401).json({ errors: 'User is disabled, please contact admin' });
      return;
    }

    //* the req.session.user type is set in src/app.ts
    req.session.user = {
      id: loggedUser.id,
      email: loggedUser.email,
      role: loggedUser.role,
      disabled: loggedUser.disabled,
      name: loggedUser.name,
    };
    req.session.save();

    const userToBeReturned = {
      name: loggedUser.name,
      email: loggedUser.email,
    };
    res.status(200).json({ ...userToBeReturned });
  }
};

const logout = (req: Request, res: Response, _next: NextFunction): void => {
  req.session.destroy((err: unknown) => {
    if (err) {
      Logger.error('Error when destroying session');
    }
  });
  res.status(204).end();
};

const authCheck = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { user } = req.session;

  if (user) {
    //* we add the below check is well to ensure that users deleted from the DB cannot continue to have an active session
    const userInDB = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (userInDB) {
      res.json({ name: user.name, email: user.email });
    } else {
      req.session.destroy(() => {});
      res.status(401).json({ errors: 'Unauthorized' });
    }
  } else {
    req.session.destroy(() => {});
    res.status(401).json({ errors: 'Unauthorized' });
  }
};

const refreshSession = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { user } = req.session;

  //* as above
  if (user) {
    const userInDB = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (userInDB) {
      req.session.touch();
      res.status(200).json({ status: 'OK' });
    } else {
      req.session.destroy(() => {});
      res.status(401).json({ errors: 'Unauthorized' });
    }
  } else {
    req.session.destroy(() => {});
    res.status(401).json({ errors: 'Unauthorized' });
  }
};

export const sessionController = { login, logout, authCheck, refreshSession };
