import express from 'express';
import 'express-async-errors';
import { connectToDatabase } from './utils/db';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const start = async () => {
  await connectToDatabase();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();

export default app;
