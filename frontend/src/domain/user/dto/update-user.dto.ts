import { z } from "zod"

export const updateUserSchema = z.object({
  id: z.number(),
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato XXX.XXX.XXX-XX"),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP deve estar no formato XXXXX-XXX"),
  logradouro: z.string().min(1, "Logradouro é obrigatório"),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  uf: z.string().min(2, "Estado é obrigatório"),
})

export type UpdateUserDto = z.infer<typeof updateUserSchema>
