import { FastifyInstance } from "fastify";
import { z } from "zod";
import { CreateSevice } from "../application/use-cases/create-service";
import { PrismaServicesRepository } from "../database/prisma/repositories/prisma-services-repository";
import { FindServices } from "../application/use-cases/find-services";
import { FindService } from "../application/use-cases/find-service";
import { PrismaSeviceMapper } from "../database/prisma/mappers/prisma-service-mapper";
import { UpdateService } from "../application/use-cases/update-service";
import { DeleteService } from "../application/use-cases/delete-service";

export async function servicesRoutes(app: FastifyInstance) {
  app.post('/services', async (request) => {
  const bodySchema = z.object({
    name: z.string(),
      description: z.string().optional(),
      price: z.number().optional()
    })

    const { name, description, price } = bodySchema.parse(request.body)
    
    const createService = new CreateSevice(new PrismaServicesRepository())
    
    const { service } = await createService.execute({ name, description, price })
    
    return { message: 'success created service!', service: PrismaSeviceMapper.toHttp(service) }
  })
  
  app.get('/services', async () => {
    const findServices = new FindServices(new PrismaServicesRepository())

    const services = (await findServices.execute()).services.map(service => {
      return PrismaSeviceMapper.toHttp(service)
    })

    return { services }
  })

  app.get('/services/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(request.params)

    const findService = new FindService(new PrismaServicesRepository())

    const service = PrismaSeviceMapper.toHttp((await findService.execute({ serviceId: id })).service)

    return { service }
  })

  app.put('/services/:id', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      price: z.number()
    })

    const paramsSchema = z.object({
      id: z.string()
    })

    const { name, description, price } = bodySchema.parse(request.body)
    const { id } = paramsSchema.parse(request.params)

    const updateService = new UpdateService(new PrismaServicesRepository())
    const { service } = await updateService.execute({
      id,
      name,
      description,
      price
    })

    return { message: 'success updated service', service: PrismaSeviceMapper.toHttp(service) }
  })

  app.delete('/services/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(request.params)

    const deleteService = new DeleteService(new PrismaServicesRepository())

    await deleteService.execute({ serviceId: id })

    return { message: 'success deleted service' }
  })
}