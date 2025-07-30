"use client"

import { formatCpf } from "@/utils/format"
import { useState } from "react"

export function useCpfMask(initialValue = "") {
  const [value, setValue] = useState(initialValue)

  const handleChange = (newValue: string) => {
    const formatted = formatCpf(newValue)
    setValue(formatted)
  }

  const isValid = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, "")
    return numbers.length === 11
  }

  return {
    value,
    setValue: handleChange,
    isValid: isValid(value),
    rawValue: value.replace(/\D/g, ""),
  }
}
