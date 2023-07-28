import { InMemoryServiceOrdersRepository } from '../../../test/repositories/in-memory-service-orders-repository'
import { Customer } from '../entities/Customer'
import { User } from '../entities/User'
import { CreateServiceOrder } from './create-service-order'

describe('create service order', () => {
  test('payment, start, and finish not informed', async () => {
    const inMemoryServiceOrdersRepository = new InMemoryServiceOrdersRepository()
    const createServiceOrder = new CreateServiceOrder(inMemoryServiceOrdersRepository)

    const customer = new Customer({ name: 'John Doe' })
    const user = new User({ email: 'john@example.com', password: '***' })
    const { serviceOrder } = await createServiceOrder.execute({ customer, user, description: 'cleaning' })

    expect(inMemoryServiceOrdersRepository.serviceOrders).toHaveLength(1)
    expect(inMemoryServiceOrdersRepository.serviceOrders[0]).toEqual(serviceOrder)
    expect(serviceOrder.paid).toEqual(false)
    expect(serviceOrder.start).toEqual(serviceOrder.finish)
  })

  test('payment, start, and finish informed', async () => {
    const inMemoryServiceOrdersRepository = new InMemoryServiceOrdersRepository()
    const createServiceOrder = new CreateServiceOrder(inMemoryServiceOrdersRepository)

    
    const customer = new Customer({ name: 'John Doe' })
    const user = new User({ email: 'john@example.com', password: '***' })
    const start = new Date(new Date().getFullYear(), new Date().getMonth() - 2)
    const finish = new Date
    const { serviceOrder } = await createServiceOrder.execute({ customer, user, description: 'cleaning', paid: true, start, finish })

    expect(inMemoryServiceOrdersRepository.serviceOrders).toHaveLength(1)
    expect(inMemoryServiceOrdersRepository.serviceOrders[0]).toEqual(serviceOrder)
    expect(serviceOrder.paid).toEqual(true)
    expect(serviceOrder.start).toEqual(start)
    expect(serviceOrder.finish).toEqual(finish)
    expect(start).not.toBe(finish)
  })
})