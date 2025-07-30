export interface User {
  id: number
  nome: string
  cpf: string
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  uf: string
  dataCriacao: Date
  dataAtualizacao?: Date
}
