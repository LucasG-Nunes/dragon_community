import { z } from "zod";

export const loginSchema = z.object({
  user: z
    .string()
    .min(3, "Usuário deve ter no mínimo 3 caracteres")
    .max(50, "Usuário muito longo")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Usuário pode conter apenas letras, números, _ e -",
    ),
  pass: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(100, "Senha muito longa"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
