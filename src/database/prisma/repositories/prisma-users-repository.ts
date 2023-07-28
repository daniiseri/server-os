import { User } from "../../../application/entities/User";
import { UsersRepository } from "../../../application/repositories/usersRepository";
import { NotFoundError } from "../../../customs/errors";
import { prisma } from '../../../lib/prisma'
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

export class PrismaUsersRepository implements UsersRepository {
  async count(): Promise<number> {
    return prisma.usuarios.count()
  }

  async create(data: User): Promise<void> {
    const row = PrismaUserMapper.toPrisma(data)

    await prisma.usuarios.create({
      data: row
    }) 
  }

  async findOne(userId: string): Promise<User> {
    const user = await prisma.usuarios.findUnique({
      where: { idUsuarios: userId }
    })

    if(!user){
      throw new NotFoundError('user not found')
    }

    return PrismaUserMapper.toDomain(user)
  }
}