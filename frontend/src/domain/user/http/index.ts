import { UserService } from "./user.service"
import { ViaCepService } from "./viacep.service"

export class Service {
  static users = UserService
  static viaCep = ViaCepService
}
