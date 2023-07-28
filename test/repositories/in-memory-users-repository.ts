import { randomUUID } from "crypto";
import { User } from "../../src/application/entities/User";
import { UsersRepository } from "../../src/application/repositories/usersRepository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(data: User): Promise<void> {
    this.users.push(data)
  }

  async count(): Promise<number> {
    return this.users.length
  }

  async findOne(userId: string): Promise<User> {
    const user = this.users.find(({ id }) => id === userId)

    if(!user){
      throw new Error('user not found')
    }

    return user
  }
}