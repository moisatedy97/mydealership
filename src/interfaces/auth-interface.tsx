import { z } from "zod";

export const authFormSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type AuthForm = z.infer<typeof authFormSchema>;
