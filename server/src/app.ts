import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import helmet from 'helmet';
import { connectToDatabase, connectToRedis } from '@/utils';
import { Logger } from '@/lib';

// routers
import { userRouter } from '@/features/auth';

// middleware
import { morganMiddleware } from '@/middleware';

export const app = express();
app.use(helmet());

connectToDatabase().catch((_e) => {
  Logger.debug('An error occurred during postgres initialization:');
});

connectToRedis().catch((_e) => {
  Logger.debug('An error occurred during redis initialization:');
});

app.use(express.json());
app.use(cors());
app.use(morganMiddleware);

app.use('/api/users', userRouter);
