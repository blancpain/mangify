import { Prisma } from '@prisma/client';
import { FullUserProfile, MealRecipe } from '@shared/types';
import { prisma } from './postgres';
import { isNumber } from './helpers';

// this is the UserMeal type but we need to spread it out for the function to work as overlaps on utility types not allowed
// export const findMeal = async (
//   mealUniqueIdentifier: string,
// ): Promise<{
//   id: string;
//   recipe_external_id: number | null;
//   active: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   profileId: string;
// } | null> => {
//   const meal = await prisma.meal.findUnique({
//     where: {
//       unique_identifier: mealUniqueIdentifier,
//     },
//   });
//   if (!meal) return null;
//   return meal;
// };

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

export const getUserMeals = async (id: string) => {
  const userMeals = await prisma.profile.findUnique({
    where: {
      id,
    },
    select: {
      meals: {
        where: {
          active: true,
        },
        select: {
          active: true,
          recipe_external_id: true,
          day: true,
        },
      },
    },
  });
  return userMeals;
};

export type TUserMeals = Prisma.PromiseReturnType<typeof getUserMeals>;

export const syncMealsWithDb = async (transformedMealData: MealRecipe[], userId: string) => {
  // NOTE: 1) we clear all user meals, 2) we create all the new meals for the given date with their unique identifiers
  // and 3) we connect the meals to the user profile

  await prisma.meal.deleteMany({
    where: {
      profileId: userId,
    },
  });

  await Promise.all(
    transformedMealData.map(async (meal) => {
      const allIngredients = [
        ...new Set(
          (meal.ingredients ?? []).map((ingredient) => ({
            external_id: ingredient.id,
          })),
        ),
      ];

      await prisma.ingredients.createMany({
        data: allIngredients,
        skipDuplicates: true,
      });

      const createdIngredients = await prisma.ingredients.findMany({
        where: {
          external_id: {
            in: allIngredients.map((ingredient) => ingredient.external_id).filter(isNumber),
          },
        },
        select: { id: true },
      });

      const createdMeal = await prisma.meal.create({
        data: {
          day: meal.date,
          active: true,
          unique_identifier: meal.uniqueIdentifier,
          profileId: userId,
          recipe_external_id: meal.id,
          ingredients: {
            connect: createdIngredients,
          },
        },
      });

      await prisma.profile.update({
        where: {
          id: userId,
        },
        data: {
          meals: {
            connect: {
              id: createdMeal.id,
            },
          },
        },
      });
    }),
  );
};

// export const syncMealsWithDbForRefresh = async (
//   transformedMealData: MealRecipe[],
//   userId: string,
// ) => {
//   await prisma.meal.deleteMany({
//     where: {
//       profileId: userId,
//     },
//   });
//
//   await Promise.all(
//     transformedMealData.map(async (meal) => {
//       await prisma.profile.update({
//         where: {
//           id: userId,
//         },
//         data: {
//           meals: {
//             update: {
//               where: {
//                 recipe_external_id: meal.id!,
//               },
//               data: {
//                 unique_identifier: meal.uniqueIdentifier,
//               },
//             },
//           },
//         },
//       });
//     }),
//   );
// };

// NOTE: deactivates all meals that are not part of the newly generated batch of meals
export const dbDeativateAll = async (meals: MealRecipe[], userProfileId: string) => {
  const allMealIds = meals.map((meal) => meal.id as number);
  await prisma.profile.update({
    where: {
      id: userProfileId,
    },
    data: {
      meals: {
        updateMany: {
          where: {
            recipe_external_id: {
              notIn: allMealIds,
            },
          },
          data: {
            active: false,
          },
        },
      },
    },
  });
};

// NOTE: deactivates all existing meals associated with a given date
export const dbDeactivateAllSingleDay = async (mealDate: Date, userProfileId: string) => {
  // NOTE: we do the below to ensure we get the correct date range
  const startDate = new Date(mealDate);
  startDate.setUTCHours(0, 0, 0, 0); // Set the time to the start of the day

  const endDate = new Date(mealDate);
  endDate.setUTCHours(23, 59, 59, 999); // Set the time to the end of the day

  await prisma.profile.update({
    where: {
      id: userProfileId,
    },
    data: {
      meals: {
        updateMany: {
          where: {
            day: {
              // NOTE: this is basically equals or earlier in the same day OR later in the same day
              lte: endDate,
              gte: startDate,
            },
          },
          data: {
            active: false,
          },
        },
      },
    },
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
