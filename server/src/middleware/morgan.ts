import morgan, { StreamOptions } from 'morgan';
import { Logger } from '@/lib';

const stream: StreamOptions = {
  // Use the http severity
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

// Build the morgan middleware
export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);
