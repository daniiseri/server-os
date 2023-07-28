import { clientes } from '@prisma/client'
import { Customer } from '../../../application/entities/Customer'

export class PrismaCustomerMapper {
  static toPrisma(customer: Customer): clientes {
    return {
      idClientes: customer.id,
      nomeCliente: customer.name,
      dataCadastro: customer.createdAt,
      asaas_id: null,
      sexo: null,
      pessoa_fisica: null,
      documento: null,
      telefone: null,
      celular: null,
      email: null,
      senha: null,
      rua: null,
      numero: null,
      bairro: null,
      cidade: null,
      estado: null,
      cep: null,
      contato: null,
      complemento: null,
      fornecedor: null,
    }
  }

  static toDomain(customer: clientes): Customer {
    return new Customer({
      name: customer.nomeCliente,
      createdAt: customer.dataCadastro,
    },
      customer.idClientes,
    )
  }

  static toHttp(customer: Customer): any {
    return {
      id: customer.id,
      name: customer.name,
      createdAt: customer.createdAt
    }
  }
}