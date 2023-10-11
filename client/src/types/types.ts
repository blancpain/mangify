// TODO: use below numbers for calc, for types we use other

// export enum Sex {
//   MALE = 'MALE',
//   FEMALE = 'FEMALE',
// }
//
// export enum ActivityLevel {
//   Sedentary = 1.2,
//   Light = 1.375,
//   Moderate = 1.55,
//   VeryActive = 1.725,
// }
//
// export enum Goal {
//   loseWeight = 0.8,
//   maintain = 1,
//   gainWeight = 1.2,
// }

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
