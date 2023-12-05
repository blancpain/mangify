import RedisStore from 'connect-redis';
import { redisClient } from '@/utils';

// NOTE: ttl is currently based on maxAge of the cookie defined below
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'mangify_session_',
});

export const sessionOptions = {
  secret: process.env.SESSION_SECRET as string,

  // NOTE: maxAge is currently set to 5 days similar to the firebase session cookie
  cookie: { maxAge: 3600000 * 24 * 5, httpOnly: true, signed: true },
  saveUninitialized: true,
  resave: false,
  store: redisStore,
};
