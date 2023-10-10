import * as bcrypt from 'bcryptjs';
import { TLoginSchema, FullUserForAuth } from '@shared/types';
import { prisma, exclude } from '@/utils';

const login = async (user: TLoginSchema): Promise<FullUserForAuth | null> => {
  const { email, password } = user;
  const targetedUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      passwordHash: true,
      disabled: true,
    },
  });

  const targetedUserProfile = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      profile: true,
    },
  });

  const passwordCorrect =
    targetedUser === null ? false : await bcrypt.compare(password, targetedUser.passwordHash);

  // NOTE: below should be safe since a user always has a profile created at registration hence it can't be null
  if (!(targetedUser && passwordCorrect) || !targetedUserProfile) return null;

  const filteredUser = exclude(targetedUser, ['passwordHash']);

  // NOTE: as above, a user always has a profile by default
  if (
    typeof targetedUserProfile === 'object' &&
    'profile' in targetedUserProfile &&
    targetedUserProfile.profile
  ) {
    const filteredUserProfile = exclude(targetedUserProfile.profile, [
      'id',
      'userId',
      'createdAt',
      'updatedAt',
    ]);

    const userToBeReturned = {
      user: filteredUser,
      profile: filteredUserProfile,
    };

    return userToBeReturned;
  }

  return null;
};

export const sessionService = { login };
