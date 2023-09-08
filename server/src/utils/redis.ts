import { createClient } from 'redis';
import { Logger } from '@/lib';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

//! below just for testing might not need it in app.ts
export const connectToRedis = async () => {
  try {
    await redisClient.connect();
    Logger.debug('Redis client successfully connected');
    // await redisClient.set('try', 'Welcome to Redis!');
  } catch (error) {
    Logger.error(error);
  }
};
