import { NextFunction, Request, Response } from 'express';
import { ZodSchemaGenericWrapper } from '@/types';
import { extractUserEmailFromId } from './db';

// type guards
export const isNumber = (input: unknown): input is number => typeof input === 'number';
export const isObjectWithKey = <T, K extends keyof T>(obj: unknown, key: K): obj is T =>
  typeof obj === 'object' && obj !== null && key in obj;

// generic helpers
export const extractCalories = (input: string): number | null => {
  const regex = /<b>(\d+)\s*calories<\/b>/i;
  const match = input.match(regex);

  if (match) {
    return Number(match[1].trim());
  }
  return null;
};

export const processUserSettingsUpdate = async <T>(
  req: Request,
  res: Response,
  _next: NextFunction,
  schema: ZodSchemaGenericWrapper<T>,
  updateFunction: (email: string, data: T) => Promise<void>,
): Promise<void> => {
  const { userId } = req;

  if (!userId) {
    res.status(401).json({ errors: 'Unauthorized' });
    return;
  }

  const userEmail = await extractUserEmailFromId(userId);
  if (!userEmail) {
    res.status(401).json({ errors: 'Unauthorized' });
    return;
  }

  // eslint-disable-next-line prefer-destructuring
  const body: unknown = req.body;
  const result = schema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    res.status(400).json({ errors: zodErrors });
    return;
  }

  await updateFunction(userEmail, result.data);
  res.status(200).json(result.data);
};

export const removeDuplicatesFromArrayOfObjects = <T, K extends keyof T>(
  array: T[],
  key: K,
): T[] => {
  const uniqueArray = [...new Map(array.map((item) => [item[key], item])).values()];

  return uniqueArray;
};
