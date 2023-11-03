import express, { RequestHandler } from 'express';
import { prisma, redisClient } from '@/utils';

export const testingRouter = express.Router();

// eslint-disable-next-line func-names
testingRouter.post('/reset', async function (_req, res): Promise<void> {
  await redisClient.flushAll();
  await prisma.ingredients.deleteMany();
  await prisma.meal.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  res.status(204).end();
} as RequestHandler);
