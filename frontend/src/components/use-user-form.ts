import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserSchema, type CreateUserDto } from "../domain/user/dto/create-user.dto"
import { updateUserSchema, type UpdateUserDto } from "../domain/user/dto/update-user.dto"
import { userQueries } from "../domain/user/hooks/user.queries"
import { viaCepQueries } from "../domain/user/hooks/viacep.queries"
import { useCpfMask } from "../hooks/use-cpf-mask"
import { useCepMask } from "../hooks/use-cep-mask"
import { User } from "@/domain/user/entities/user"
import { useToast } from "@/hooks/use-toast"
import { AxiosError } from "axios"

type Props = {
  user?: User
  onSuccess?: () => void
}

const useUserForm = ({ user, onSuccess }: Props) => {
  const { toast } = useToast()
  const [addressError, setAddressError] = useState(false)

  const isEditing = !!user
  const schema = isEditing ? updateUserSchema : createUserSchema

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreateUserDto | UpdateUserDto>({
    resolver: zodResolver(schema),
    defaultValues: user
      ? {
          id: user.id,
          nome: user.nome,
          cpf: user.cpf,
          cep: user.cep,
          logradouro: user.logradouro,
          bairro: user.bairro,
          cidade: user.cidade,
          uf: user.uf,
        }
      : undefined,
  })

  const cpfMask = useCpfMask(user?.cpf || "")
  const cepMask = useCepMask(user?.cep || "")

  const createUser = userQueries.useCreateUser()
  const updateUser = userQueries.useUpdateUser()

  const watchedCep = watch("cep")
  const { data: addressData, isLoading: isLoadingAddress } =
    viaCepQueries.useGetAddressByCep(cepMask.value)

  useEffect(() => {
    setValue("cpf", cpfMask.value)
  }, [cpfMask.value, setValue])

  useEffect(() => {
    setValue("cep", cepMask.value)
  }, [cepMask.value, setValue])

  useEffect(() => {
    if (addressData && !addressData.erro) {
      setAddressError(false)
      setValue("logradouro", addressData.logradouro, { shouldValidate: true })
      setValue("bairro", addressData.bairro, { shouldValidate: true })
      setValue("cidade", addressData.localidade, { shouldValidate: true })
      setValue("uf", addressData.uf, { shouldValidate: true })
    } else if (addressData?.erro) {
      setAddressError(true)
      setValue("logradouro", "", { shouldValidate: true })
      setValue("bairro", "", { shouldValidate: true })
      setValue("cidade", "", { shouldValidate: true })
      setValue("uf", "", { shouldValidate: true })
    }
  }, [addressData, setValue])

  const onSubmit = async (data: CreateUserDto | UpdateUserDto) => {
    try {
      const body = {
        ...data,
        cpf: data.cpf.replace(/\D/gi, ""),
        cep: data.cep.replace(/\D/gi, ""),
      }
      if (isEditing) {
        console.log("hit")
        await updateUser.mutateAsync(body as UpdateUserDto)
      } else {
        await createUser.mutateAsync(body as CreateUserDto)
      }
      onSuccess?.()
      if (!isEditing) {
        reset()
        cpfMask.setValue("")
        cepMask.setValue("")
      }
      toast({
        title: "Usuário salvo com sucesso",
        description: isEditing
          ? "Usuário atualizado com sucesso."
          : "Usuário criado com sucesso.",
        variant: "default",
      })
    } catch (error) {
      const message = (error as any).response?.data || "Erro ao salvar usuário"
      toast({
        title: message,
        description: "Ocorreu um erro ao tentar salvar o usuário. Tente novamente.",
        variant: "destructive",
      })
      console.error("Erro ao salvar usuário:", error)
    }
  }

  const isLoading = createUser.isPending || updateUser.isPending

  return {
    isLoading,
    errors,
    isEditing,
    isLoadingAddress,
    addressError,
    cpfMask,
    cepMask,
    onSubmit,
    register,
    handleSubmit,
  }
}

export default useUserForm
