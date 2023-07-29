import { Customer } from "../../../application/entities/Customer";
import { prisma } from "../../../lib/prisma";
import { CustomersRepository } from "../../../application/repositories/customersRepository";
import { PrismaCustomerMapper } from "../mappers/prisma-customer-mapper";
import { AppError, NotFoundError } from "../../../customs/errors";

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

  async update(data: Customer): Promise<void> {
    const count = await prisma.clientes.count({
      where: { idClientes: data.id }
    })

    if(count === 0){
      throw new AppError('invalid customer ID')
    }

    const row = PrismaCustomerMapper.toPrisma(data)

    await prisma.clientes.update({
      data: row,
      where: { idClientes: data.id }
    })
  }

  async delete(customerId: string): Promise<void> {
    await prisma.clientes.delete({ where: { idClientes: customerId } })
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