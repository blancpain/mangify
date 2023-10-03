export type UserState = {
  name: string | null;
  email: string | null;
  settings: UserSettings;
};

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum ActivityLevel {
  Sedentary = 1.2,
  Light = 1.375,
  Moderate = 1.55,
  VeryActive = 1.725,
}

export enum Goal {
  loseWeight = 0.8,
  maintain = 1,
  gainWeight = 1.2,
}

export type UserSettings = {
  sex: Sex | undefined;
  age: number | undefined;
  weight: number | undefined;
  height: number | undefined;
  activity: ActivityLevel | undefined;
  goal: Goal | undefined;
};

// use utility types to 1) make all user settings optional and then 2) remove undefined as an option for all
export type UserSettingsComplete = Required<Partial<UserSettings>>;

export type UserREE = Omit<UserSettings, 'activity'>;

export type CalendarState = {
  day: boolean;
  weekRange: [string, string];
  dayRange: string;
};

export type MealSettings = {
  numberOfMeals: number;
};

export type NutritionPreferences = {
  diet: string | undefined;
  cuisines: string[] | undefined;
  intolerances: string[] | undefined;
  nutritionProfile: NutritionProfile | null;
};

export type NutritionMacros = {
  protein: number;
  fats: number;
  carbs: number;
};

export type NutritionProfile = {
  calories: number;
  macros: NutritionMacros;
};
