// src/schemas/signin.ts
import { z } from "zod";

export const signinSchema = z.object({
  // format only, says nothing about whether the account exists
  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email."),
  // no length rule here, the server decides if it is correct
  password: z.string().min(1, "Enter your password."),
});

export type SigninFormData = z.infer<typeof signinSchema>;