import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { connectToDatabase } from '@/utils';
import { Logger } from '@/lib';

// routers
import { userRouter } from '@/features/auth';

// middleware
import { morganMiddleware } from '@/middleware';

export const app = express();

connectToDatabase().catch((_e) => {
  Logger.debug('An error occurred during app initialization:');
});

app.use(express.json());
app.use(cors());
app.use(morganMiddleware);

app.use('/api/users', userRouter);

//! consider setting up helmet middleware => should be good for security external stuff can go in src/lib
