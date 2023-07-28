import { InMemoryServiceOrdersRepository } from '../../../test/repositories/in-memory-service-orders-repository'
import { Customer } from '../entities/Customer'
import { ServiceOrder } from '../entities/ServiceOrder'
import { User } from '../entities/User'
import { FindServiceOrder } from './find-service-order'

describe('find service order', () => {
  test('service order found', async () => {
    const inMemoryServiceOrdersRepository = new InMemoryServiceOrdersRepository()
    inMemoryServiceOrdersRepository.create(new ServiceOrder({
      customer: new Customer({
        name: 'John Doe'
      }),
      description: 'cleanning',
      user: new User({
        email: 'johndoe@example.com',
        password: '***'
      })
    },
      'testId'
    ))
    const findServiceOrder = new FindServiceOrder(inMemoryServiceOrdersRepository)

    const { serviceOrder } = await findServiceOrder.execute({ serviceOrderId: 'testId' })

    expect(serviceOrder.description).toEqual('cleanning')
  })

  test('service not order found', async () => {
    const inMemoryServiceOrdersRepository = new InMemoryServiceOrdersRepository()
    
    const findServiceOrder = new FindServiceOrder(inMemoryServiceOrdersRepository)

    expect(findServiceOrder.execute({ serviceOrderId: 'testId' })).rejects.toThrow('service order not found')
  })
})