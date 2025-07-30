export const formatCpf = (cpf: string) => {
  const numbers = cpf.replace(/\D/g, "")
  return numbers
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

export const formatCep = (cep: string) => {
  const numbers = cep.replace(/\D/g, "")
  return numbers.replace(/(\d{5})(\d)/, "$1-$2").replace(/(-\d{3})\d+?$/, "$1")
}

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
