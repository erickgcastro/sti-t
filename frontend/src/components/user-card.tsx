import { User } from "@/domain/user/entities/user"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, MapPin, Trash2, UserIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { formatCep, formatCpf, formatDate } from "@/utils/format"

type Props = {
  data: User
  handleEdit: (user: User) => void
  handleDelete: (user: User) => void
}

const UserCard = ({ data, handleDelete, handleEdit }: Props) => {
  data.cpf = formatCpf(data.cpf)
  data.cep = formatCep(data.cep)

  return (
    <Card key={data.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-blue-500" />
              <h3 className="font-semibold text-lg">{data.nome}</h3>
              <Badge variant="secondary">{data.cpf}</Badge>
            </div>

            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mt-0.5 text-green-500" />
              <div>
                <p>
                  {data.logradouro}, {data.bairro}
                </p>
                <p>
                  {data.cidade} - {data.uf}
                </p>
                <p>CEP: {data.cpf}</p>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              <p>Cadastrado em: {formatDate(data.dataCriacao)}</p>
              {data.dataAtualizacao && (
                <p>Atualizado em: {formatDate(data.dataAtualizacao)}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(data)}>
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(data)}>
              <Trash2 className="h-4 w-4 mr-1" />
              Excluir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserCard
