import {
  TSexSchema,
  TActivitySchema,
  TGoalSchema,
  TAgeSchema,
  THeightSchema,
  TWeightSchema,
  TDietSchema,
  TNumberOfMealsSchema,
  TCuisinesSchema,
  TIntolerancesSchema,
  TCaloriesSchema,
  TProteinSchema,
  TCarbsSchema,
  TFatsSchema,
} from '@/types';
import { prisma } from '@/utils';

// HACK: https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#update-or-create-a-related-record

const updateAge = async (email: string, userAge: TAgeSchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            age: userAge.age,
          },
          update: {
            age: userAge.age,
          },
        },
      },
    },
  });
};

const updateWeight = async (email: string, userWeight: TWeightSchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            weight: userWeight.weight,
          },
          update: {
            weight: userWeight.weight,
          },
        },
      },
    },
  });
};

const updateHeight = async (email: string, userHeight: THeightSchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            height: userHeight.height,
          },
          update: {
            height: userHeight.height,
          },
        },
      },
    },
  });
};

const updateCalories = async (email: string, userCalories: TCaloriesSchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            calories: userCalories.calories,
          },
          update: {
            calories: userCalories.calories,
          },
        },
      },
    },
  });
};

const updateProtein = async (email: string, userProtein: TProteinSchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            protein: userProtein.protein,
          },
          update: {
            protein: userProtein.protein,
          },
        },
      },
    },
  });
};

const updateCarbs = async (email: string, userCarbs: TCarbsSchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            carbs: userCarbs.carbs,
          },
          update: {
            carbs: userCarbs.carbs,
          },
        },
      },
    },
  });
};

const updateFats = async (email: string, userFats: TFatsSchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            fats: userFats.fats,
          },
          update: {
            fats: userFats.fats,
          },
        },
      },
    },
  });
};

const updateSex = async (email: string, userSex: TSexSchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            sex: userSex.sex,
          },
          update: {
            sex: userSex.sex,
          },
        },
      },
    },
  });
};

const updateGoal = async (email: string, userGoal: TGoalSchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            goal: userGoal.goal,
          },
          update: {
            goal: userGoal.goal,
          },
        },
      },
    },
  });
};

const updateActivity = async (email: string, userActivity: TActivitySchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            activity_level: userActivity.activity,
          },
          update: {
            activity_level: userActivity.activity,
          },
        },
      },
    },
  });
};

const updateDiet = async (email: string, userDiet: TDietSchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            diet: userDiet.diet,
          },
          update: {
            diet: userDiet.diet,
          },
        },
      },
    },
  });
};

const updateNumberOfMeals = async (
  email: string,
  numberOfMeals: TNumberOfMealsSchema,
): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            meals_per_day: numberOfMeals.numberOfMeals,
          },
          update: {
            meals_per_day: numberOfMeals.numberOfMeals,
          },
        },
      },
    },
  });
};

const updateCuisines = async (email: string, cuisines: TCuisinesSchema): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            favorite_cuisines: cuisines.cuisines,
          },
          update: {
            favorite_cuisines: cuisines.cuisines,
          },
        },
      },
    },
  });
};

const updateIntolerances = async (
  email: string,
  userIntolerances: TIntolerancesSchema,
): Promise<void> => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      profile: {
        upsert: {
          create: {
            intolerances: userIntolerances.intolerances,
          },
          update: {
            intolerances: userIntolerances.intolerances,
          },
        },
      },
    },
  });
};
export const userSettingsService = {
  updateSex,
  updateAge,
  updateActivity,
  updateWeight,
  updateHeight,
  updateGoal,
  updateDiet,
  updateNumberOfMeals,
  updateCuisines,
  updateIntolerances,
  updateCarbs,
  updateCalories,
  updateProtein,
  updateFats,
};
