import { Prisma } from '@prisma/client';
import { MealRecipe } from 'mangify-shared-types';
// eslint-disable-next-line import/no-relative-packages
import { Profile as FullUserProfile } from '../../node_modules/.prisma/client/index';
import { prisma } from './postgres';

export const extractUserProfileId = async (userId: string): Promise<string | null> => {
  const userProfileId = await prisma.profile.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  if (userProfileId) return userProfileId.id;
  return null;
};

export const extractUserProfile = async (userId: string): Promise<FullUserProfile | null> => {
  const userProfile = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });

  if (userProfile) return userProfile;
  return null;
};

export const extractUserIdFromEmail = async (email: string): Promise<string | null> => {
  const userId = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (userId) return userId.id;
  return null;
};

export const extractUserEmailFromId = async (id: string): Promise<string | null> => {
  const userEmail = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      email: true,
    },
  });
  if (userEmail) return userEmail.email;
  return null;
};

export const getUserMeals = async (id: string) => {
  const userMeals = await prisma.meal.findMany({
    where: {
      profileId: id,
      active: true,
    },
  });

  return userMeals;
};
export type TUserMeals = Prisma.PromiseReturnType<typeof getUserMeals>;

export const clearDB = async (userId: string) => {
  await prisma.meal.deleteMany({
    where: {
      profileId: userId,
    },
  });
};

export const syncMealsWithDb = async (transformedMealData: MealRecipe[], userId: string) => {
  await clearDB(userId);

  await prisma.meal.createMany({
    data: transformedMealData.map((meal) => ({
      day: meal.date,
      active: true,
      unique_identifier: meal.uniqueIdentifier,
      profileId: userId,
      recipe_external_id: meal.id,
    })),
  });
};

export const dbDeactivateOneMeal = async (uniqueIdentifier: string, userProfileId: string) => {
  await prisma.profile.update({
    where: {
      id: userProfileId,
    },
    data: {
      meals: {
        update: {
          where: {
            unique_identifier: uniqueIdentifier,
          },
          data: {
            active: false,
          },
        },
      },
    },
  });
};
