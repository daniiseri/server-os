import { FastifyInstance } from "fastify";
import z from 'zod'

import { PrismaUsersRepository } from '../database/prisma/repositories/prisma-users-repository'
import { CreateUser } from '../application/use-cases/create-user'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6)
    })

    const { name, email, password } = bodySchema.parse(request.body)

    const prismaUsersRepository = new PrismaUsersRepository()

    const createUser = new CreateUser(prismaUsersRepository)

    const { user } = await createUser.execute({ name, email, password })

    return { message: 'success created user!', user }
  })
}