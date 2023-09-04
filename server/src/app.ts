import express from 'express';
import 'express-async-errors';
import { connectToDatabase } from '@/utils';

export const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

connectToDatabase().catch((_e) => {
  console.log('An error occurred during app initialization:');
});
