"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import type { User } from "../domain/user/entities/user"
import useUserForm from "./use-user-form"
import { cn } from "@/lib/utils"

type Props = {
  user?: User
  onSuccess?: () => void
  onCancel?: () => void
}

export function UserForm({ user, onSuccess, onCancel }: Props) {
  const {
    errors,
    isLoading,
    isEditing,
    addressError,
    cpfMask,
    isLoadingAddress,
    cepMask,
    handleSubmit,
    onSubmit,
    register,
  } = useUserForm({ user, onSuccess })

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Editar Usuário" : "Cadastrar Novo Usuário"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                {...register("nome")}
                placeholder="Digite seu nome completo"
              />
              {errors.nome && (
                <p className="text-sm text-red-500">{errors.nome.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                value={cpfMask.value}
                onChange={(e) => cpfMask.setValue(e.target.value)}
                placeholder="000.000.000-00"
                maxLength={14}
              />
              {errors.cpf && <p className="text-sm text-red-500">{errors.cpf.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cep">CEP *</Label>
            <div className="relative">
              <Input
                id="cep"
                value={cepMask.value}
                onChange={(e) => cepMask.setValue(e.target.value)}
                placeholder="00000-000"
                maxLength={9}
                className={cn(addressError ? "border-red-500" : "")}
              />
              {isLoadingAddress && (
                <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />
              )}
            </div>
            {errors.cep && <p className="text-sm text-red-500">{errors.cep.message}</p>}
            {addressError && (
              <div>
                <span className="text-sm text-red-500">
                  CEP não encontrado. Verifique se o CEP está correto.
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logradouro">Logradouro *</Label>
              <Input
                id="logradouro"
                {...register("logradouro")}
                placeholder="Rua, Avenida, etc."
                disabled
              />
              {errors.logradouro && (
                <p className="text-sm text-red-500">{errors.logradouro.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro *</Label>
              <Input
                id="bairro"
                {...register("bairro")}
                disabled
                placeholder="Nome do bairro"
              />
              {errors.bairro && (
                <p className="text-sm text-red-500">{errors.bairro.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade *</Label>
              <Input
                disabled
                id="cidade"
                {...register("cidade")}
                placeholder="Nome da cidade"
              />
              {errors.cidade && (
                <p className="text-sm text-red-500">{errors.cidade.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="uf">Estado *</Label>
              <Input
                disabled
                id="uf"
                {...register("uf")}
                placeholder="UF"
                maxLength={2}
              />
              {errors.uf && <p className="text-sm text-red-500">{errors.uf.message}</p>}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Atualizar" : "Cadastrar"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
