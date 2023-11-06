import { MealRecipe } from 'mangify-shared-types';
import { isEqual, startOfDay } from 'date-fns';

// NOTE: we return a function in order to pass an additional param (currentDate) to the filter method where this is used
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

// NOTE: periods can easily be reduced/extended as needed; currently we only support up to 7 days
export const getEndOfPeriod = (date: Date): string => {
  const startOfPeriod = new Date(date);
  startOfPeriod.setDate(startOfPeriod.getDate() + 6);
  return startOfPeriod.toISOString();
};

export const getStartOfPeriod = (date: Date): string => {
  const endOfPeriod = new Date(date);
  endOfPeriod.setDate(endOfPeriod.getDate() - 6);
  return endOfPeriod.toISOString();
};

export const generateDateArray = (startDate: Date, endDate: Date) => {
  const dates = [];
  const initialDate = new Date(startDate);
  while (initialDate <= endDate) {
    dates.push(new Date(initialDate));
    initialDate.setDate(initialDate.getDate() + 1);
  }
  return dates;
};
