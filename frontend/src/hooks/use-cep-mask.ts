"use client"

import { formatCep } from "@/utils/format"
import { useState } from "react"

export function useCepMask(initialValue = "") {
  const [value, setValue] = useState(initialValue)

  const handleChange = (newValue: string) => {
    const formatted = formatCep(newValue)
    setValue(formatted)
  }

  const isValid = (cep: string) => {
    const numbers = cep.replace(/\D/g, "")
    return numbers.length === 8
  }

  return {
    value,
    setValue: handleChange,
    isValid: isValid(value),
    rawValue: value.replace(/\D/g, ""),
  }
}
