import * as bcrypt from 'bcryptjs';
import { TLoginSchema, FullUserForAuth, UserProfileForClient, UserForAuth } from '@shared/types';
import { prisma, exclude, getUserMeals, TUserMeals } from '@/utils';

const login = async (user: TLoginSchema): Promise<FullUserForAuth | null> => {
  const { email, password } = user;
  // NOTE: select user - if pass is wrong no need for further queries
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

  const passwordCorrect =
    targetedUser === null ? false : await bcrypt.compare(password, targetedUser.passwordHash);

  if (!(targetedUser && passwordCorrect)) return null;

  const filteredUser: UserForAuth = exclude(targetedUser, ['passwordHash']);

  // NOTE: select user profile
  const targetedUserProfile = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      profile: true,
    },
  });

  // NOTE: below should be safe since a user always has a profile created at registration hence it can't be null
  if (
    targetedUserProfile &&
    typeof targetedUserProfile === 'object' &&
    'profile' in targetedUserProfile &&
    targetedUserProfile.profile
  ) {
    const filteredUserProfile: UserProfileForClient = exclude(targetedUserProfile.profile, [
      'id',
      'userId',
      'createdAt',
      'updatedAt',
    ]);

    // NOTE: select user meals - ingredients we generate at the client level upon initial refresh of meals
    const meals: TUserMeals = await getUserMeals(targetedUserProfile.profile.id);

    const userToBeReturned = {
      user: filteredUser,
      profile: filteredUserProfile,
      meals,
    };

    return userToBeReturned;
  }

  return null;
};

// TODO: refactor this file as lots of repetition
const authCheck = async (email: string): Promise<FullUserForAuth | null> => {
  // NOTE: select user - if pass is wrong no need for further queries
  const targetedUser = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      disabled: true,
    },
  });

  if (!targetedUser) return null;

  // NOTE: select user profile
  const targetedUserProfile = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      profile: true,
    },
  });

  // NOTE: below should be safe since a user always has a profile created at registration hence it can't be null
  if (
    targetedUserProfile &&
    typeof targetedUserProfile === 'object' &&
    'profile' in targetedUserProfile &&
    targetedUserProfile.profile
  ) {
    const filteredUserProfile: UserProfileForClient = exclude(targetedUserProfile.profile, [
      'id',
      'userId',
      'createdAt',
      'updatedAt',
    ]);

    // NOTE: select user meals - ingredients we generate at the client level upon initial refresh of meals
    const meals: TUserMeals = await getUserMeals(targetedUserProfile.profile.id);

    const userToBeReturned = {
      user: targetedUser,
      profile: filteredUserProfile,
      meals,
    };

    return userToBeReturned;
  }

  return null;
};
export const sessionService = { login, authCheck };
