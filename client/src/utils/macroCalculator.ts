import { ActivityLevel, UserSettingsComplete, Goal, NutritionMacros } from '@/types';

// method: Calcs taken from: https://healthyeater.com/how-to-calculate-your-macros

/*
 * Resting Energy Expenditure (REE) formula (for metric system):

 * REE formula for men
 * 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5 = REE
 *
 * REE formula for women
 * 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) – 161 = REE
 *
 * TDEE (movement expenditure formula):
 *
 * Sedentary
 * Just everyday activities like a bit of walking, a couple of flights of stairs, eating, talking, etc. (REE X 1.2)
 *
 * Light activity
 * Any activity that burns an additional 200-400 calories for females or 250-500 calories for males. (REE x 1.375)
 *
 * Moderate activity
 * Any activity that burns an additional 400-650 calories for females or 500-800 calories for males. (REE x 1.55)
 *
 * Very Active
 * Any activity that burns an additional 650+ calories for females or 800+ calories for males. (REE x 1.725)
 */

const calculateTDEE = (activityLevel: ActivityLevel, REE: number): number => {
  switch (activityLevel) {
    case ActivityLevel.Sedentary:
      return REE * 1.2;
    case ActivityLevel.Light:
      return REE * 1.375;
    case ActivityLevel.Moderate:
      return REE * 1.55;
    case ActivityLevel.VeryActive:
      return REE * 1.725;
    default:
      return REE;
  }
};

//* Goals - 1) lose weight = -20% calories, 2) maintain = No change, 3) gain weight = +20% calories

const applyGoal = (goal: Goal, TDEE: number): number => {
  switch (goal) {
    case Goal.loseWeight:
      return TDEE * 0.8;
    case Goal.maintain:
      return TDEE;
    case Goal.gainWeight:
      return TDEE * 1.2;
    default:
      return TDEE;
  }
};

/*
* Macros

* 0.8g/1g per kg weight = Protein (1g protein = 4 calories)
* 30% of total intake = Fat (1g fat = 9 calories)
* Remainder = Carbs (1g carbs = 4 calories)
*/
export const calculateMacros = (weight: number, totalIntake: number): NutritionMacros => {
  const dailyProtein = 0.8 * weight;
  const dailyProteinInCalories = dailyProtein * 4;
  const dailyFatsInCalories = 0.3 * totalIntake;
  const dailyFats = dailyFatsInCalories / 9;
  const dailyCarbs = (totalIntake - (dailyProteinInCalories + dailyFatsInCalories)) / 4;

  return {
    protein: Math.round(dailyProtein),
    fats: Math.round(dailyFats),
    carbs: Math.round(dailyCarbs),
  };
};

export const calculateDailyIntake = (userData: UserSettingsComplete): number | null => {
  if (userData.sex === 'male') {
    const REE = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
    const totalIntake = calculateTDEE(userData.activity, REE);
    const totalIntakeWithGoal = applyGoal(userData.goal, totalIntake);
    return totalIntakeWithGoal;
  }
  if (userData.sex === 'female') {
    const REE = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
    const totalIntake = calculateTDEE(userData.activity, REE);
    const totalIntakeWithGoal = applyGoal(userData.goal, totalIntake);
    return totalIntakeWithGoal;
  }
  return null;
};
