import { z } from "zod";

export const MealGeneratorLandingSchema = z.object({
  meals: z.string().min(1, { message: "Please specify the number of meals" }),
  diet: z.string().optional(),
});

export type TMealGeneratorLandingSchema = z.infer<
  typeof MealGeneratorLandingSchema
>;
