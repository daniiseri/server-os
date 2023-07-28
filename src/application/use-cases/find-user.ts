import { User } from "../entities/User"
import { UsersRepository } from "../repositories/usersRepository"

interface FindUserRequest {
  userId: string
}

interface FindUserResponse {
  user: User
}

export class FindUser {
  constructor(private usersRepository: UsersRepository){}

  async execute(request: FindUserRequest): Promise<FindUserResponse>{
    const { userId } = request

    const user = await this.usersRepository.findOne(userId)

    if(!user){
      throw new Error('user not found')
    }

    return { user }
  }
}