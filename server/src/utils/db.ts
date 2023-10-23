import { Prisma } from '@prisma/client';
import { FullUserProfile, MealRecipe } from '@shared/types';
import { prisma } from './postgres';
import { isNumber } from './helpers';

// this is the UserMeal type but we need to spread it out for the function to work as overlaps on utility types not allowed
export const findMeal = async (
  mealId: number,
): Promise<{
  id: string;
  recipe_external_id: number | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  profileId: string;
} | null> => {
  const meal = await prisma.meal.findUnique({
    where: {
      recipe_external_id: mealId,
    },
  });
  if (!meal) return null;
  return meal;
};

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

export const syncMealsWithDb = async (
  transformedMealData: MealRecipe[],
  userId: string,
  mealDate: Date,
) => {
  await Promise.all(
    transformedMealData.map(async (meal) => {
      // HACK:
      // - 1) check if a meal already exists - if it does just connect to the user profile
      // - 2) if it doesn't exist - we first extract all ingredients, removing duplicates
      // - 3) then create the ingredients that don't already exist in the ingredients table
      // - 4) then we get all ingredients - ( created or existing ) that are part of this recipe and
      // - 5) connect them to the meal
      // - 6) we create the meal with the associated ingredients and connect it to the user profile

      const existingMeal = await findMeal(Number(meal.id));

      if (existingMeal) {
        await prisma.profile.update({
          where: {
            id: userId,
          },
          data: {
            meals: {
              update: {
                where: {
                  // TODO: check if below non-null assertion is OK?
                  recipe_external_id: existingMeal.recipe_external_id!,
                },
                data: {
                  active: true,
                  day: mealDate,
                  unique_identifier: meal.uniqueIdentifier,
                },
              },
              connect: {
                id: existingMeal.id,
              },
            },
          },
        });
      } else {
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
            day: mealDate,
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
      }
    }),
  );
};

export const syncMealsWithDbForRefresh = async (
  transformedMealData: MealRecipe[],
  userId: string,
) => {
  await Promise.all(
    transformedMealData.map(async (meal) => {
      await prisma.profile.update({
        where: {
          id: userId,
        },
        data: {
          meals: {
            update: {
              where: {
                recipe_external_id: meal.id!,
              },
              data: {
                unique_identifier: meal.uniqueIdentifier,
              },
            },
          },
        },
      });
    }),
  );
};

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
