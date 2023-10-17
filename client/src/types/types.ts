export type CalendarState = {
  day: boolean;
  weekRange: [string, string];
  dayRange: string;
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
