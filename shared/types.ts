import { z } from "zod";
import { User } from "../server/node_modules/.prisma/client/index";

export const MealGeneratorLandingSchema = z.object({
  numberOfMeals: z
    .string()
    .min(1, { message: "Please specify the number of meals" }),
  diet: z.string().optional(),
});

export type TMealGeneratorLandingSchema = z.infer<
  typeof MealGeneratorLandingSchema
>;

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Please enter your name"),
    email: z.string().email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

/*
  Prisma types
*/

export type NonSensitiveUser = Pick<User, "id" | "name" | "email" | "role">;
export type UserForAuth = Pick<
  User,
  "id" | "email" | "role" | "disabled" | "name"
>;
export type LoggedUser = Pick<User, "email" | "name">;

/* Prisma types */

/*
  Spoonacular types ( Generated with the help of quicktype )
*/

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

/* Spoonacular types */
