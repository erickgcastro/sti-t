"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Service } from "../http"
import { Key } from "@/services"

function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [Key(Service.users, "createUser")],
    mutationFn: Service.users.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Key(Service.users, "getAllUsers")] })
    },
  })
}

function useGetAllUsers() {
  return useQuery({
    queryKey: [Key(Service.users, "getAllUsers")],
    queryFn: Service.users.getAllUsers,
  })
}

function useGetUserById(id: string) {
  return useQuery({
    queryKey: [Key(Service.users, "getUserById"), id],
    queryFn: () => Service.users.getUserById(id),
    enabled: !!id,
  })
}

function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [Key(Service.users, "updateUser")],
    mutationFn: Service.users.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Key(Service.users, "getAllUsers")] })
    },
  })
}

function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [Key(Service.users, "deleteUser")],
    mutationFn: Service.users.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Key(Service.users, "getAllUsers")] })
    },
  })
}

export const userQueries = {
  useCreateUser,
  useGetAllUsers,
  useGetUserById,
  useUpdateUser,
  useDeleteUser,
}
