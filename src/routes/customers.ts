import { FastifyInstance } from "fastify";
import { PrismaCustomersRepository } from "../database/prisma/repositories/prisma-customers-repository";
import { FindCustomers } from "../application/use-cases/find-customers";
import { z } from "zod";
import { FindCustomer } from "../application/use-cases/find-customer";
import { CreateCustomer } from "../application/use-cases/create-customer";
import { PrismaCustomerMapper } from "../database/prisma/mappers/prisma-customer-mapper";
import { UpdateCustomer } from "../application/use-cases/update-customer";
import { DeleteCustomer } from "../application/use-cases/delete-customer";

export async function customersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  app.get('/customers', async () => {
    const prismaCustomersRepository = new PrismaCustomersRepository();
    const findCustomers = new FindCustomers(prismaCustomersRepository);
    const customers = (await findCustomers.execute()).customers.map(customer => {
      return PrismaCustomerMapper.toHttp(customer)
    });

    return { customers }
  })

  app.get('/customers/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(request.params);
    const prismaCustomersRepository = new PrismaCustomersRepository();
    const findCustomer = new FindCustomer(prismaCustomersRepository);
    const { customer } = await findCustomer.execute({ cutomerId: id });

    return { customer }
  })

  app.post('/customers', async (request) => {
    const bodySchema = z.object({
      name: z.string()
    })

    const { name } = bodySchema.parse(request.body)
    const prismaCustomersRepository = new PrismaCustomersRepository();
    const createCustomer = new CreateCustomer(prismaCustomersRepository);
    const { customer } = await createCustomer.execute({ name });

    return { message: 'success created customer!', customer: PrismaCustomerMapper.toHttp(customer) }
  })

  app.patch('/customers/:id', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
    })

    const paramsSchema = z.object({
      id: z.string()
    })

    const { name } = bodySchema.parse(request.body)
    const { id } = paramsSchema.parse(request.params)

    const updateCustomer = new UpdateCustomer(new PrismaCustomersRepository())
    const { customer } = await updateCustomer.execute({
      id,
      name,
    })

    return { message: 'client updated successfully', customer: PrismaCustomerMapper.toHttp(customer) }
  })

  app.delete('/customers/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(request.params)
    const deleteCutomer = new DeleteCustomer(new PrismaCustomersRepository())

    await deleteCutomer.execute({ customerId: id })

    return { message: 'success deleted customer' }
  })
}