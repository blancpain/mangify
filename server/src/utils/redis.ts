import { createClient } from 'redis';
import { Logger } from '@/lib';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

const connectToRedis = async () => {
  try {
    await redisClient.connect();
    Logger.debug('Connected to redis database successfully');
  } catch (_e) {
    Logger.error('Failed to connect to redis database');
    return process.exit(1);
  }
  return null;
};

export { connectToRedis, redisClient };
