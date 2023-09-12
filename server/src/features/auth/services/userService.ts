import * as bcrypt from 'bcryptjs';
import { TSignUpSchema, NonSensitiveUser } from '@shared/types';
import { prisma } from '@/utils';

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

const createUser = async (newUser: TSignUpSchema): Promise<NonSensitiveUser | null> => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

  const addedUser = prisma.user.create({
    data: {
      name: newUser.name ? newUser.name : '',
      email: newUser.email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return addedUser;
};

const deleteUser = async (id: string): Promise<NonSensitiveUser | null> => {
  const deletedUser = await prisma.user.delete({
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
  return deletedUser;
};

export const userService = { getAll, getOne, createUser, deleteUser };
