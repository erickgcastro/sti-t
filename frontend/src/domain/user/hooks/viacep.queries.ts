"use client"
import { Key } from "@/services"
import { ViaCepService } from "../http/viacep.service"
import { useQuery } from "@tanstack/react-query"
import { Service } from "../http"

function useGetAddressByCep(cep: string) {
  const cleanCep = cep?.replace(/\D/g, "") || ""

  return useQuery({
    queryKey: [Key(Service.viaCep, "getAddressByCep"), cleanCep],
    queryFn: () => Service.viaCep.getAddressByCep(cleanCep),
    enabled: cleanCep.length === 8,
    retry: false,
  })
}

export const viaCepQueries = {
  useGetAddressByCep,
}
