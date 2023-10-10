export type UserState = {
  user: {
    name: string | null;
    email: string | null;
  };
  profile: UserSettings;
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
  diet: string | undefined;
  sex: Sex | undefined;
  activityLevel: ActivityLevel | undefined;
  goal: Goal | undefined;
  age: number | undefined;
  height: number | undefined;
  weight: number | undefined;
  intolerances: string[] | undefined;
  favoriteCuisines: string[] | undefined;
  mealsPerDay: number | undefined;
  recipesToAvoid: string[] | undefined;
  meals: string[] | undefined;
  shoppingList: string[] | undefined;
  favoriteRecipes: string[] | undefined;
};

// using utility types to 1) make all user settings optional and then 2) remove undefined as an option for all
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
