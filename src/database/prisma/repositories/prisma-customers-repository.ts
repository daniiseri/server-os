import { Customer } from "../../../application/entities/Customer";
import { prisma } from "../../../lib/prisma";
import { CustomersRepository } from "../../../application/repositories/customersRepository";
import { PrismaCustomerMapper } from "../mappers/prisma-customer-mapper";
import { NotFoundError } from "../../../customs/errors";

export class PrismaCustomersRepository implements CustomersRepository {
  async count(): Promise<number> {
    return prisma.clientes.count()
  }

  async create(data: Customer): Promise<void> {
    const row = PrismaCustomerMapper.toPrisma(data)

    await prisma.clientes.create({
      data: row
    })
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await prisma.clientes.findUnique({
      where: { idClientes: id },
    })

    if(!customer){
      throw new NotFoundError('customer not found')
    }

    return PrismaCustomerMapper.toDomain(customer)
  }

  async findAll(): Promise<Customer[]> {
    const customers = await prisma.clientes.findMany()

    return customers.map(data => {
      return PrismaCustomerMapper.toDomain(data)
    })
  }
}