import { FastifyInstance } from "fastify";
import { z } from "zod";
import axios from 'axios'
import { CLIENT_ID, SECRET_KEY } from "../utils/constants";
import { prisma } from "../lib/prisma";
import { PrismaUserMapper } from '../database/prisma/mappers/prisma-user-mapper'
import { User } from "../application/entities/User";

interface DecodeJWT {
  name: string,
  email: string,
  sub: string,
  picture: string
}


export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string()
    })

    const { code } = bodySchema.parse(request.body)

    const { data: { id_token } } = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: CLIENT_ID,
      client_secret: SECRET_KEY,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/api/auth/callback'
    })

    const { name, email, sub, picture } = app.jwt.decode(id_token) as DecodeJWT

    const findUser = await prisma.usuarios.findUnique({
      where: { idUsuarios: sub }
    })

    if (!findUser) {
      await prisma.usuarios.create({
        select: {
          idUsuarios: true,
          nome: true,
          email: true,
          url_image_user: true
        },
        data: PrismaUserMapper.toPrisma(new User({
          email,
          name,
        },
          sub
        ))
      })
    }

    const token = app.jwt.sign({
      name,
      email,
      picture
    }, {
      sub
    })

    return token
  })
}