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

export const userService = { getAll };
