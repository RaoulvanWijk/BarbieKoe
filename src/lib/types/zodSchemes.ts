import { z } from "zod";

export const loginSchema = z.object({
  password: z.string().min(6, { message: "Wachtwoord is onjuist" }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
