import { z } from "zod";

export const MealGeneratorLandingSchema = z.object({
  meals: z.string().min(1, { message: "Please specify the number of meals" }),
  diet: z.string().optional(),
});

export type TMealGeneratorLandingSchema = z.infer<
  typeof MealGeneratorLandingSchema
>;

export const signUpSchema = z
  .object({
    name: z.string().optional(),
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
