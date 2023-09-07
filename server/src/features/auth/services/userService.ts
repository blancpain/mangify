import { prisma } from '@/utils';
import { NonSensitiveUser } from '@/types';

const getAll = async (): Promise<NonSensitiveUser[]> => {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return allUsers;
};

const getOne = async (id: string): Promise<NonSensitiveUser | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return user;
};

export const userService = { getAll, getOne };
