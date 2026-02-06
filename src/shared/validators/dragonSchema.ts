import { z } from "zod";

export const dragonSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(50, "Nome muito longo")
    .regex(/^[a-zA-Z\s]+$/, "Nome pode conter apenas letras e espaços"),
  type: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(10, "Nome muito longo"),
});

export type DragonFormData = z.infer<typeof dragonSchema>;
