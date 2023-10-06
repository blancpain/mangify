import { z, ZodType } from "zod";
import {
  User,
  Profile,
  Meal,
} from "../server/node_modules/.prisma/client/index";

/*

 * Zod types and schemas *

 */

// wrapper to allow us to pass generic schemas
export type ZodSchemaGenericWrapper<T> = ZodType<T>;

// meal generator - showcase
export const MealGeneratorLandingSchema = z.object({
  numberOfMeals: z
    .string()
    .min(1, { message: "Please specify the number of meals" }),
  diet: z.string().optional(),
});

export type TMealGeneratorLandingSchema = z.infer<
  typeof MealGeneratorLandingSchema
>;

// sign-up and login
export const signUpSchema = z

  .object({
    name: z.string().min(1, "Please enter your name"),
    email: z.string().min(1, "Please enter your email").email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Please enter your email").email(),
  password: z.string().min(1, "Please enter your password"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

// user settings

export enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export const SexSchema = z.object({
  sex: z.nativeEnum(Sex),
});
export type TSexSchema = z.infer<typeof SexSchema>;

export enum ActivityLevel {
  SEDENTARY = "SEDENTARY",
  LIGHT = "LIGHT",
  MODERATE = "MODERATE",
  VERYACTIVE = "VERYACTIVE",
}
export const ActivitySchema = z.object({
  activity: z.nativeEnum(ActivityLevel),
});
export type TActivitySchema = z.infer<typeof ActivitySchema>;

export enum Goal {
  LOSEWEIGHT = "LOSEWEIGHT",
  MAINTAIN = "MAINTAIN",
  GAINWEIGHT = "GAINWEIGHT",
}
export const GoalSchema = z.object({
  goal: z.nativeEnum(Goal),
});
export type TGoalSchema = z.infer<typeof GoalSchema>;

export enum Diet {
  ANYTHING = "ANYTHING",
  VEGETARIAN = "VEGETARIAN",
  VEGAN = "VEGAN",
  KETOGENIC = "KETOGENIC",
  PALEO = "PALEO",
  PESCETARIAN = "PESCETARIAN",
}
export const DietSchema = z.object({
  diet: z.nativeEnum(Diet),
});
export type TDietSchema = z.infer<typeof DietSchema>;

export const AgeSchema = z.object({
  age: z.number(),
});
export type TAgeSchema = z.infer<typeof AgeSchema>;

export const WeightSchema = z.object({
  weight: z.number(),
});
export type TWeightSchema = z.infer<typeof WeightSchema>;

export const HeightSchema = z.object({
  height: z.number(),
});
export type THeightSchema = z.infer<typeof HeightSchema>;

export const NumberOfMealsSchema = z.object({
  numberOfMeals: z.number(),
});
export type TNumberOfMealsSchema = z.infer<typeof NumberOfMealsSchema>;

export const CuisinesSchema = z.object({
  cuisines: z.string().array(),
});
export type TCuisinesSchema = z.infer<typeof CuisinesSchema>;

export const IntolerancesSchema = z.object({
  intolerances: z.string().array(),
});
export type TIntolerancesSchema = z.infer<typeof IntolerancesSchema>;

/* Zod types */

/*

 * Prisma types *

*/

export type NonSensitiveUser = Pick<User, "id" | "name" | "email" | "role">;

export type UserForAuth = Pick<
  User,
  "id" | "email" | "role" | "disabled" | "name"
>;

export type LoggedUser = Pick<User, "email" | "name">;

export type MainUserProfile = Omit<
  Profile,
  | "id"
  | "userId"
  | "createdAt"
  | "updatedAt"
  | "activity_level"
  | "goal"
  | "sex"
>;

type NonNullableProperties<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

export type MainUserProfileNonNullable = NonNullableProperties<MainUserProfile>;

export type UserMeals = Meal;

/* Prisma types */

/*

 * Spoonacular types ( Generated and converted to zod schemas with the help of quicktype (https://quicktype.io/) ) *

*/

// Schema for random meal API endpoint

export const ConsistencySchema = z.enum(["LIQUID", "SOLID"]);
export type Consistency = z.infer<typeof ConsistencySchema>;

export const MetricSchema = z.object({
  amount: z.union([z.number(), z.null()]).optional(),
  unitShort: z.union([z.null(), z.string()]).optional(),
  unitLong: z.union([z.null(), z.string()]).optional(),
});

export type Metric = z.infer<typeof MetricSchema>;
export const MeasuresSchema = z.object({
  us: z.union([MetricSchema, z.null()]).optional(),
  metric: z.union([MetricSchema, z.null()]).optional(),
});

export type Measures = z.infer<typeof MeasuresSchema>;

export const ExtendedIngredientSchema = z.object({
  id: z.union([z.number(), z.null()]).optional(),
  aisle: z.union([z.null(), z.string()]).optional(),
  image: z.union([z.null(), z.string()]).optional(),
  consistency: z.union([ConsistencySchema, z.null()]).optional(),
  name: z.union([z.null(), z.string()]).optional(),
  nameClean: z.union([z.null(), z.string()]).optional(),
  original: z.union([z.null(), z.string()]).optional(),
  originalName: z.union([z.null(), z.string()]).optional(),
  amount: z.union([z.number(), z.null()]).optional(),
  unit: z.union([z.null(), z.string()]).optional(),
  meta: z.union([z.array(z.string()), z.null()]).optional(),
  measures: z.union([MeasuresSchema, z.null()]).optional(),
});

export type ExtendedIngredient = z.infer<typeof ExtendedIngredientSchema>;

export const LengthSchema = z.object({
  number: z.union([z.number(), z.null()]).optional(),
  unit: z.union([z.null(), z.string()]).optional(),
});
export type Length = z.infer<typeof LengthSchema>;

export const EntSchema = z.object({
  id: z.union([z.number(), z.null()]).optional(),
  name: z.union([z.null(), z.string()]).optional(),
  localizedName: z.union([z.null(), z.string()]).optional(),
  image: z.union([z.null(), z.string()]).optional(),
  temperature: z.union([LengthSchema, z.null()]).optional(),
});
export type Ent = z.infer<typeof EntSchema>;

export const StepSchema = z.object({
  number: z.union([z.number(), z.null()]).optional(),
  step: z.union([z.null(), z.string()]).optional(),
  ingredients: z.union([z.array(EntSchema), z.null()]).optional(),
  equipment: z.union([z.array(EntSchema), z.null()]).optional(),
  length: z.union([LengthSchema, z.null()]).optional(),
});

export type Step = z.infer<typeof StepSchema>;

export const AnalyzedInstructionSchema = z.object({
  name: z.union([z.null(), z.string()]).optional(),
  steps: z.union([z.array(StepSchema), z.null()]).optional(),
});
export type AnalyzedInstruction = z.infer<typeof AnalyzedInstructionSchema>;

export const RecipeSchema = z.object({
  vegetarian: z.union([z.boolean(), z.null()]).optional(),
  vegan: z.union([z.boolean(), z.null()]).optional(),
  glutenFree: z.union([z.boolean(), z.null()]).optional(),
  dairyFree: z.union([z.boolean(), z.null()]).optional(),
  veryHealthy: z.union([z.boolean(), z.null()]).optional(),
  cheap: z.union([z.boolean(), z.null()]).optional(),
  veryPopular: z.union([z.boolean(), z.null()]).optional(),
  sustainable: z.union([z.boolean(), z.null()]).optional(),
  lowFodmap: z.union([z.boolean(), z.null()]).optional(),
  weightWatcherSmartPoints: z.union([z.number(), z.null()]).optional(),
  gaps: z.union([z.null(), z.string()]).optional(),
  preparationMinutes: z.union([z.number(), z.null()]).optional(),
  cookingMinutes: z.union([z.number(), z.null()]).optional(),
  aggregateLikes: z.union([z.number(), z.null()]).optional(),
  healthScore: z.union([z.number(), z.null()]).optional(),
  creditsText: z.union([z.null(), z.string()]).optional(),
  license: z.union([z.null(), z.string()]).optional(),
  sourceName: z.union([z.null(), z.string()]).optional(),
  pricePerServing: z.union([z.number(), z.null()]).optional(),
  extendedIngredients: z
    .union([z.array(ExtendedIngredientSchema), z.null()])
    .optional(),
  id: z.union([z.number(), z.null()]).optional(),
  title: z.union([z.null(), z.string()]).optional(),
  readyInMinutes: z.union([z.number(), z.null()]).optional(),
  servings: z.union([z.number(), z.null()]).optional(),
  sourceUrl: z.union([z.null(), z.string()]).optional(),
  image: z.union([z.null(), z.string()]).optional(),
  imageType: z.union([z.null(), z.string()]).optional(),
  summary: z.union([z.null(), z.string()]).optional(),
  cuisines: z.union([z.array(z.any()), z.null()]).optional(),
  dishTypes: z.union([z.array(z.string()), z.null()]).optional(),
  diets: z.union([z.array(z.any()), z.null()]).optional(),
  occasions: z.union([z.array(z.any()), z.null()]).optional(),
  instructions: z.union([z.null(), z.string()]).optional(),
  analyzedInstructions: z
    .union([z.array(AnalyzedInstructionSchema), z.null()])
    .optional(),
  originalId: z.null().optional(),
  spoonacularSourceUrl: z.union([z.null(), z.string()]).optional(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
export const RecipeListSchema = z.object({
  recipes: z.union([z.array(RecipeSchema), z.null()]).optional(),
});

export type RecipeList = z.infer<typeof RecipeListSchema>;

// Meal generator - showcase type for frontend
export type ShowCaseRecipe = {
  extendedIngredients?: string[];
  title?: string | null;
  image?: string | null;
  calories?: number | null;
  dishType?: string | null;
  steps?: string[];
};

// Schema for a complex search API endpoint (some overlap with above schemas so reusing types/schemas)

export const UnitSchema = z.enum(["", "g", "IU", "kcal", "mg", "%", "µg"]);
export type Unit = z.infer<typeof UnitSchema>;

export const WeightPerServingSchema = z.object({
  amount: z.union([z.number(), z.null()]).optional(),
  unit: z.union([UnitSchema, z.null()]).optional(),
});
export type WeightPerServing = z.infer<typeof WeightPerServingSchema>;

export const FlavonoidSchema = z.object({
  name: z.union([z.null(), z.string()]).optional(),
  amount: z.union([z.number(), z.null()]).optional(),
  unit: z.union([UnitSchema, z.null()]).optional(),
  percentOfDailyNeeds: z.union([z.number(), z.null()]).optional(),
});
export type Flavonoid = z.infer<typeof FlavonoidSchema>;

export const IngredientSchema = z.object({
  id: z.union([z.number(), z.null()]).optional(),
  name: z.union([z.null(), z.string()]).optional(),
  amount: z.union([z.number(), z.null()]).optional(),
  unit: z.union([z.null(), z.string()]).optional(),
  nutrients: z.union([z.array(FlavonoidSchema), z.null()]).optional(),
});
export type Ingredient = z.infer<typeof IngredientSchema>;

export const CaloricBreakdownSchema = z.object({
  percentProtein: z.union([z.number(), z.null()]).optional(),
  percentFat: z.union([z.number(), z.null()]).optional(),
  percentCarbs: z.union([z.number(), z.null()]).optional(),
});
export type CaloricBreakdown = z.infer<typeof CaloricBreakdownSchema>;

export const NutritionSchema = z.object({
  nutrients: z.union([z.array(FlavonoidSchema), z.null()]).optional(),
  properties: z.union([z.array(FlavonoidSchema), z.null()]).optional(),
  flavonoids: z.union([z.array(FlavonoidSchema), z.null()]).optional(),
  ingredients: z.union([z.array(IngredientSchema), z.null()]).optional(),
  caloricBreakdown: z.union([CaloricBreakdownSchema, z.null()]).optional(),
  weightPerServing: z.union([WeightPerServingSchema, z.null()]).optional(),
});
export type Nutrition = z.infer<typeof NutritionSchema>;

export const EdIngredientSchema = z.object({
  id: z.union([z.number(), z.null()]).optional(),
  aisle: z.union([z.null(), z.string()]).optional(),
  image: z.union([z.null(), z.string()]).optional(),
  consistency: z.union([ConsistencySchema, z.null()]).optional(),
  name: z.union([z.null(), z.string()]).optional(),
  nameClean: z.union([z.null(), z.string()]).optional(),
  original: z.union([z.null(), z.string()]).optional(),
  originalName: z.union([z.null(), z.string()]).optional(),
  amount: z.union([z.number(), z.null()]).optional(),
  unit: z.union([z.null(), z.string()]).optional(),
  meta: z.union([z.array(z.string()), z.null()]).optional(),
  measures: z.union([MeasuresSchema, z.null()]).optional(),
  unitLong: z.union([z.null(), z.string()]).optional(),
  unitShort: z.union([z.null(), z.string()]).optional(),
  extendedName: z.union([z.null(), z.string()]).optional(),
});
export type EdIngredient = z.infer<typeof EdIngredientSchema>;

export const ResultSchema = z.object({
  vegetarian: z.union([z.boolean(), z.null()]).optional(),
  vegan: z.union([z.boolean(), z.null()]).optional(),
  glutenFree: z.union([z.boolean(), z.null()]).optional(),
  dairyFree: z.union([z.boolean(), z.null()]).optional(),
  veryHealthy: z.union([z.boolean(), z.null()]).optional(),
  cheap: z.union([z.boolean(), z.null()]).optional(),
  veryPopular: z.union([z.boolean(), z.null()]).optional(),
  sustainable: z.union([z.boolean(), z.null()]).optional(),
  lowFodmap: z.union([z.boolean(), z.null()]).optional(),
  weightWatcherSmartPoints: z.union([z.number(), z.null()]).optional(),
  gaps: z.union([z.null(), z.string()]).optional(),
  preparationMinutes: z.union([z.number(), z.null()]).optional(),
  cookingMinutes: z.union([z.number(), z.null()]).optional(),
  aggregateLikes: z.union([z.number(), z.null()]).optional(),
  healthScore: z.union([z.number(), z.null()]).optional(),
  creditsText: z.union([z.null(), z.string()]).optional(),
  sourceName: z.union([z.null(), z.string()]).optional(),
  pricePerServing: z.union([z.number(), z.null()]).optional(),
  extendedIngredients: z
    .union([z.array(EdIngredientSchema), z.null()])
    .optional(),
  id: z.union([z.number(), z.null()]).optional(),
  title: z.union([z.null(), z.string()]).optional(),
  readyInMinutes: z.union([z.number(), z.null()]).optional(),
  servings: z.union([z.number(), z.null()]).optional(),
  sourceUrl: z.union([z.null(), z.string()]).optional(),
  image: z.union([z.null(), z.string()]).optional(),
  imageType: z.union([z.null(), z.string()]).optional(),
  nutrition: z.union([NutritionSchema, z.null()]).optional(),
  summary: z.union([z.null(), z.string()]).optional(),
  cuisines: z.union([z.array(z.any()), z.null()]).optional(),
  dishTypes: z.union([z.array(z.string()), z.null()]).optional(),
  diets: z.union([z.array(z.string()), z.null()]).optional(),
  occasions: z.union([z.array(z.any()), z.null()]).optional(),
  analyzedInstructions: z
    .union([z.array(AnalyzedInstructionSchema), z.null()])
    .optional(),
  spoonacularSourceUrl: z.union([z.null(), z.string()]).optional(),
  usedIngredientCount: z.union([z.number(), z.null()]).optional(),
  missedIngredientCount: z.union([z.number(), z.null()]).optional(),
  missedIngredients: z
    .union([z.array(EdIngredientSchema), z.null()])
    .optional(),
  likes: z.union([z.number(), z.null()]).optional(),
  usedIngredients: z.union([z.array(z.any()), z.null()]).optional(),
  unusedIngredients: z.union([z.array(z.any()), z.null()]).optional(),
});
export type Result = z.infer<typeof ResultSchema>;

export const ComplexMealSearchSchema = z.object({
  results: z.union([z.array(ResultSchema), z.null()]).optional(),
  offset: z.union([z.number(), z.null()]).optional(),
  number: z.union([z.number(), z.null()]).optional(),
  totalResults: z.union([z.number(), z.null()]).optional(),
});
export type TComplexMealSearchSchema = z.infer<typeof ComplexMealSearchSchema>;

// Meal planning types for frontend

export type MealIngredients = {
  id?: number | null;
  ingredient?: string | null;
  ingredientImage?: string | null;
  amount?: number | null;
  unit?: string | null;
};

export type FullNutritionProfile = {
  calories?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fats?: number | null;
};

export type MealRecipe = {
  id?: number | null;
  ingredients?: MealIngredients[];
  title?: string | null;
  image?: string | null;
  fullNutritionProfile?: FullNutritionProfile | null;
  directions?: string[];
  fullRecipeURL?: string | null;
};

/* Spoonacular types */
