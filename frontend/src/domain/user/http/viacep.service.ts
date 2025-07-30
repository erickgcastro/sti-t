import axios from "axios"
import type { ViaCepResponse } from "../entities/address"
import { Service } from "@/services"

// !!! todo - analisar se tenho q remover esse serviço do contexto de usario

export class ViaCepService extends Service {
  public static key = "@viacep"
  private static baseURL = "https://viacep.com.br/ws"

  public static async getAddressByCep(cep: string): Promise<ViaCepResponse> {
    const cleanCep = cep.replace(/\D/g, "")
    const { data } = await axios.get(`${this.baseURL}/${cleanCep}/json/`)
    return data
  }
}
