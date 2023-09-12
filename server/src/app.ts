import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import session from 'express-session';
import helmet from 'helmet';
import { connectToDatabase, connectToRedis } from '@/utils';
import { Logger } from '@/lib';

// routers
import { userRouter, sessionRouter } from '@/features/auth';
import { mealGeneratorShowcaseRouter } from '@/features/meal_generator_showcase';

// middleware
import { morganMiddleware, sessionOptions, errorHandler } from '@/middleware';

export const app = express();
app.use(helmet());

// Augment express-session at root. For some reason having this as a separate *.d.ts file does not work globally
declare module 'express-session' {
  interface SessionData {
    user: { id: string; email: string; role: string; disabled: boolean };
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
app.use(cors());
app.use(session(sessionOptions));
app.use(morganMiddleware);

app.use('/api/users', userRouter);
app.use('/api/session', sessionRouter);
app.use('/api/meal-generator-showcase', mealGeneratorShowcaseRouter);
app.use(errorHandler);
