// src/schemas/signup.ts
import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email."),
    password: z
      .string()
      .min(8, "Use at least 8 characters.")
      .regex(/[A-Za-z]/, "Include at least one letter.")
      .regex(/[0-9]/, "Include at least one number."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
