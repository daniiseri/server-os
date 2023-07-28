import { User } from "../entities/User";

export abstract class UsersRepository {
  abstract create(data: User): Promise<void>
  abstract findOne(userId: string): Promise<User>
  abstract count(): Promise<number>
}