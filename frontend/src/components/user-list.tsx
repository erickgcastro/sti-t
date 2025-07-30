"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, UserIcon, X } from "lucide-react"
import { userQueries } from "../domain/user/hooks/user.queries"
import type { User } from "../domain/user/entities/user"
import { UserForm } from "./user-form"
import { Dialog, DialogClose, DialogContent, DialogHeader } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import UserCard from "./user-card"
import { DialogTitle } from "@radix-ui/react-dialog"

export function UserList() {
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)

  const { data: users, isLoading, error } = userQueries.useGetAllUsers()
  const deleteUser = userQueries.useDeleteUser()

  console.log(error)

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleDelete = async (user: User) => {
    setDeletingUser(user)
  }

  const confirmDelete = async () => {
    if (deletingUser) {
      try {
        await deleteUser.mutateAsync(deletingUser.id)
        setDeletingUser(null)
      } catch (error) {
        console.error("Erro ao deletar usuário:", error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando usuários...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert>
        <AlertDescription>
          Erro ao carregar a lista de usuários. Tente novamente.
        </AlertDescription>
      </Alert>
    )
  }

  if (!users || users.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <UserIcon className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-center">
            Nenhum usuário cadastrado ainda.
            <br />
            Cadastre o primeiro usuário usando o formulário acima.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Usuários Cadastrados ({users.length})</h2>

        <div className="grid gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              data={user}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="bg-none border-none p-0 ">
          <DialogHeader className="sr-only">
            <DialogTitle>Editar usuario</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <UserForm
              user={editingUser as User}
              onSuccess={() => setEditingUser(null)}
              onCancel={() => setEditingUser(null)}
            />
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o usuário "{deletingUser?.nome}"? Esta ação
              não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
              disabled={deleteUser.isPending}
            >
              {deleteUser.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
