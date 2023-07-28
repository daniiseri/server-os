import { InMemoryServicesWithServiceOrdersRepository } from '../../../test/repositories/in-memory-services-with-service-orders-repository'
import { Customer } from '../entities/Customer'
import { Service } from '../entities/Service'
import { ServiceOrder } from '../entities/ServiceOrder'
import { User } from '../entities/User'
import { CreateServiceWithServiceOrder } from './create-service-with-service-order'

test('create service', async () => {
  const inMemoryServicesWithServiceOrdersRepository = new InMemoryServicesWithServiceOrdersRepository()
  const createServiceWithServiceOrder = new CreateServiceWithServiceOrder(inMemoryServicesWithServiceOrdersRepository)

  const { serviceWithServiceOrder } = await createServiceWithServiceOrder.execute({
    service: new Service({
      name: 'cleanning'
    }),
    serviceOrder: new ServiceOrder({
      customer: new Customer({
        name: 'John Doe'
      }),
      description: 'cleanning and formatting',
      user: new User({
        email: 'johndoe@example.com',
        password: '***'
      })
    })
  })

  expect(inMemoryServicesWithServiceOrdersRepository.servicesWithServiceOrders).toHaveLength(1)
  expect(inMemoryServicesWithServiceOrdersRepository.servicesWithServiceOrders[0]).toEqual(serviceWithServiceOrder)
})