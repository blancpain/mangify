import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import 'express-async-errors';
import session from 'express-session';
import helmet from 'helmet';
import { connectToDatabase, connectToRedis } from '@/utils';
import { Logger } from '@/lib';

// routers
import { userRouter, sessionRouter } from '@/features/auth';
import { mealGeneratorShowcaseRouter } from '@/features/meal_generator_showcase';
import { userSettingsRouter } from '@/features/users';
import { mealsRouter } from '@/features/meal_planner';
import { testingRouter } from '@/testing';

// middleware
import { morganMiddleware, sessionOptions, errorHandler } from '@/middleware';

// rate limiter for /meals and /meal-generator-showcase endpoints
const sharedLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  max: 1500, // Maximum requests per day
  message: 'Daily request limit exceeded.', // status code 429 is returned
});

export const app = express();
app.use(helmet());

// Augment express-session at root. For some reason having this as a separate *.d.ts file does not work globally
declare module 'express-session' {
  interface SessionData {
    user: { id: string; email: string; role: string; disabled: boolean; name: string };
  }
}

connectToDatabase().catch((_e) => {
  Logger.debug('An error occurred during postgres initialization:');
});

connectToRedis().catch((_e) => {
  Logger.debug('An error occurred during redis initialization:');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(session(sessionOptions));
app.use(morganMiddleware);

if (process.env.NODE_ENV === 'development') {
  app.use('/api/testing', testingRouter);
}

app.use('/api/users', userRouter);
app.use('/api/session', sessionRouter);
app.use(['/api/meals', '/api/meal-generator-showcase'], sharedLimiter); // add rate limiter to these endpoints
app.use('/api/meal-generator-showcase', mealGeneratorShowcaseRouter);
app.use('/api/user', userSettingsRouter);
app.use('/api/meals', mealsRouter);
app.use(errorHandler);
