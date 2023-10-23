import { MealRecipe } from '@shared/types';
import { isEqual, startOfDay } from 'date-fns';
import { TUserMeals, isNumber } from './helpers';

// NOTE: with the below function we can generate a date array for the maxium period as required
export const generateWeekDateArray = (startDate: Date, stopDate: Date): Date[] => {
  const dateArray = [];
  let currentDate = startDate;
  let count = 0;
  while (currentDate <= stopDate && count < 7) {
    dateArray.push(new Date(currentDate));
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    count += 1;
  }
  return dateArray;
};

export function checkIfAllMealsHaveSameDate(meals: TUserMeals): Date | null {
  if (!meals || !meals.meals) return null;

  const allMealDates = meals.meals.map((meal) => meal.day);

  const allDatesAreSame = allMealDates.every((date) => date || null);

  if (allDatesAreSame) {
    return allMealDates[0];
  }

  return null;
}

export const isTheSameDate =
  (currentDate: Date) =>
  (meal: MealRecipe): boolean => {
    if (meal.date) {
      const convertedMealDate = new Date(meal.date);
      const currentDayStart = startOfDay(currentDate);
      const mealDayStart = startOfDay(convertedMealDate);
      return isEqual(currentDayStart, mealDayStart);
    }
    return false;
  };

export const isNotTheSameDate =
  (currentDate: Date) =>
  (meal: MealRecipe): boolean => {
    if (meal.date) {
      const convertedMealDate = new Date(meal.date);
      const currentDayStart = startOfDay(currentDate);
      const mealDayStart = startOfDay(convertedMealDate);
      return !isEqual(currentDayStart, mealDayStart);
    }
    return false;
  };

export const createDateFromISODate = (ISODate: string) => {
  const dateParts = ISODate.match(/^(\d{4})-(\d{2})-(\d{2}).*/);

  if (dateParts) {
    const year = parseInt(dateParts[1], 10);
    const month = parseInt(dateParts[2], 10);
    const day = parseInt(dateParts[3], 10);

    if (isNumber(year) && isNumber(month) && isNumber(day)) {
      return new Date(year, month - 1, day); // NOTE: we subtract 1 from the month since it's 0-based.
    }
  }

  return null;
};
