import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to database successfully');
  } catch (_e) {
    console.log('Failed to connect to database');
    return process.exit(1);
  }
  return null;
};

export { connectToDatabase };
