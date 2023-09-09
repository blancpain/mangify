import { PrismaClient } from '@prisma/client';
import { Logger } from '@/lib';

//* below as per https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#:~:text=The%20solution%20in%20this%20case,prevent%20instantiating%20extra%20PrismaClient%20instances.
//* to ensure only one instance of prisma across the entire app

const prismaClientSingleton = () => new PrismaClient();
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const connectToDatabase = async () => {
  try {
    // check if a raw SQL query will fail or not to determine connection status
    await prisma.$queryRaw`SELECT 1`;
    Logger.debug('Connected to postgres database successfully');
  } catch (_e) {
    Logger.error('Failed to connect to postgres database');
    return process.exit(1);
  }
  return null;
};

export { connectToDatabase, prisma };
