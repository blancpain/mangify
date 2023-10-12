// using utility types to 1) make all user settings optional and then 2) remove undefined as an option for all
// export type UserSettingsComplete = Required<Partial<UserSettings>>;
//
// export type UserREE = Omit<UserSettings, 'activity'>;

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
