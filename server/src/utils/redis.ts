import { createClient } from 'redis';
import { MealRecipe } from '@shared/types';
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

const cacheMealData = async (userProfileId: string, meals: MealRecipe[]) => {
  await redisClient.del(userProfileId);
  await redisClient.set(userProfileId, JSON.stringify(meals), { EX: 3600 });
};

export { connectToRedis, redisClient, cacheMealData };
