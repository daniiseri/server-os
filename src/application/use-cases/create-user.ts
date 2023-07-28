import { User } from "../entities/User";
import { UsersRepository } from "../repositories/usersRepository";

interface CreateUserRequest {
  name?: string
  email: string
  password: string
}

interface CreateUserResponse {
  user: User
}

export class CreateUser {
  constructor(private usersRepository: UsersRepository) { }

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, password, name } = request;

    const user = new User({ name, email, password });

    await this.usersRepository.create(user);

    return { user }
  }
}