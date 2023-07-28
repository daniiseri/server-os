import { Service } from "../../../application/entities/Service";
import { ServicesRepository } from "../../../application/repositories/servicesRepository";
import { NotFoundError } from "../../../customs/errors";
import { prisma } from "../../../lib/prisma";
import { PrismaSeviceMapper } from '../mappers/prisma-service-mapper'

export class PrismaServicesRepository implements ServicesRepository {
  async create(data: Service): Promise<void> {
    const row = PrismaSeviceMapper.toPrisma(data)

    await prisma.servicos.create({
      data: row
    })
  }

  async findOne(id: string): Promise<Service> {
    const service = await prisma.servicos.findUnique({ where: { idServicos: id } })

    if (!service) {
      throw new NotFoundError('service not found')
    }

    return PrismaSeviceMapper.toDomain(service)
  }

  async findByName(name: string): Promise<Service[]> {
    const services = await prisma.servicos.findMany({
      where: {
        nome: { contains: name }
      }
    })

    return services.map(service => {
      return PrismaSeviceMapper.toDomain(service)
    })
  }

  async findAll(): Promise<Service[]> {
    const services = await prisma.servicos.findMany()

    return services.map(service => {
      return PrismaSeviceMapper.toDomain(service)
    })
  }
}