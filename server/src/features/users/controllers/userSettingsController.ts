import { SexSchema } from '@shared/types';
import { NextFunction, Request, Response } from 'express';
import { userSettingsService } from '../services/userSettingsService';
import { Logger } from '@/lib';

const updateSex = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { user } = req.session;
  // eslint-disable-next-line prefer-destructuring
  const body: unknown = req.body;
  const result = SexSchema.safeParse(body);
  Logger.debug(body);
  Logger.debug(user);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    res.status(400).json({ errors: zodErrors });
  } else if (user && user.email) {
    await userSettingsService.updateSex(user.email, result.data);
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(400).json({ errors: 'Unauthorised' });
  }
};

export const userSettingsController = { updateSex };
