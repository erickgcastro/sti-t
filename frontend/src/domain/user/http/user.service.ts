import { httpClient } from "@/config/axios-client"
import type { CreateUserDto } from "../dto/create-user.dto"
import type { UpdateUserDto } from "../dto/update-user.dto"
import type { User } from "../entities/user"
import { HttpMethods, Service } from "@/services"

export class UserService extends Service {
  public static key = "@user"
  public static defaultPath = "/usuarios"

  public static async createUser(dto: CreateUserDto): Promise<User> {
    const method = HttpMethods.POST
    const path = Service.endpoint(UserService.defaultPath, "")
    const { data } = await httpClient[method](path, dto)
    return data
  }

  public static async getAllUsers(): Promise<User[]> {
    console.log(this?.defaultPath)
    console.log(this?.key)
    console.log(process.env.NEXT_PUBLIC_API_URL)

    const method = HttpMethods.GET
    const path = Service.endpoint(UserService.defaultPath, "")
    const { data } = await httpClient[method](path)
    return data.reverse() // !!! todo - tratar no back
  }

  public static async getUserById(id: string | number): Promise<User> {
    const method = HttpMethods.GET
    const path = Service.endpoint(UserService.defaultPath, `/${id}`)
    const { data } = await httpClient[method](path)
    return data // !!! todo - vai lançar 404, ver se vai passar direto no client
  }

  public static async updateUser(dto: UpdateUserDto): Promise<void> {
    const method = HttpMethods.PUT
    const path = Service.endpoint(UserService.defaultPath, `/${dto.id}`)
    await httpClient[method](path, dto)
  }

  public static async deleteUser(id: string | number): Promise<void> {
    const method = HttpMethods.DELETE
    const path = Service.endpoint(UserService.defaultPath, `/${id}`)
    await httpClient[method](path)
  }
}
