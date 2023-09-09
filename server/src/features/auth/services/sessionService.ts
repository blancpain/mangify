import * as bcrypt from 'bcryptjs';
import { TLoginSchema } from '@shared/types';
import { prisma, exclude } from '@/utils';
import { UserForAuth } from '@/types';

const login = async (user: TLoginSchema): Promise<UserForAuth | null> => {
  const { email, password } = user;
  const targetedUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      role: true,
      passwordHash: true,
      disabled: true,
    },
  });

  const passwordCorrect =
    targetedUser === null ? false : await bcrypt.compare(password, targetedUser.passwordHash);

  if (!(targetedUser && passwordCorrect)) return null;

  const filteredUser = exclude(targetedUser, ['passwordHash']);
  return filteredUser;
};

export const sessionService = { login };
