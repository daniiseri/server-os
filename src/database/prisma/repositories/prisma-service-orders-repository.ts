import { ServiceOrder } from "../../../application/entities/ServiceOrder";
import { ServiceOrdersRepository } from "../../../application/repositories/serviceOrdersRepository";
import { NotFoundError } from "../../../customs/errors";
import { prisma } from "../../../lib/prisma";
import { PrismaServiceOrderMapper } from "../mappers/prisma-service-order-mapper";

export class PrismaServiceOrdersRepository implements ServiceOrdersRepository {
  async create(data: ServiceOrder): Promise<void> {
    const row = PrismaServiceOrderMapper.toPrisma(data)

    await prisma.os.create({
      data: row
    })
  }

  async findOne(id: string): Promise<ServiceOrder> {
    const serviceOrder = await prisma.os.findUnique({
      where: { idOs: id }
    })

    if (!serviceOrder) {
      throw new NotFoundError('service order not found')
    }

    return PrismaServiceOrderMapper.toDomain(serviceOrder)
  }

  async findAll(): Promise<ServiceOrder[]> {
    const serviceOrdersMapper = (await prisma.os.findMany()).map(async serviceOrder => {
      const serviceOrderMapper = await PrismaServiceOrderMapper.toDomain(serviceOrder)
      return serviceOrderMapper
    })
    
    return await Promise.all(serviceOrdersMapper)
  }

  count(): Promise<number> {
    return prisma.os.count()
  }
}