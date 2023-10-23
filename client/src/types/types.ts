export type CalendarState = {
  day: boolean;
  weekRange: [string, string];
  singleDayDate: string | null;
};

export type NutritionMacros = {
  protein: number;
  fats: number;
  carbs: number;
};

export type NutritionProfile = {
  calories: number | null;
  macros: NutritionMacros | null;
};
