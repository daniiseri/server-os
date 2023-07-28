import { usuarios } from '@prisma/client'
import { User } from '../../../application/entities/User'

export class PrismaUserMapper {
  static toPrisma(user: User): usuarios {
    return {
      idUsuarios: user.id,
      nome: user.name ?? null,
      email: user.email,
      senha: user.password,
      dataCadastro: user.createdAt,
      rg: null,
      cpf: null,
      cep: null,
      rua: null,
      numero: null,
      bairro: null,
      cidade: null,
      estado: null,
      telefone: null,
      celular: null,
      situacao: null,
      permissoes_id: null,
      dataExpiracao: null,
      url_image_user: null,
    }
  }

  static toDomain(user: usuarios): User {
    return new User({
      name: user.nome ?? undefined,
      email: user.email,
      password: user.senha ?? undefined,
      createdAt: user.dataCadastro,
    },
      user.idUsuarios,
    )
  }
}