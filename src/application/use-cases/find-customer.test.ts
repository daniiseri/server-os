import { InMemoryCustomersRepository } from '../../../test/repositories/in-memory-customers-repository'
import { Customer } from '../entities/Customer'
import { FindCustomer } from './find-customer'

describe('find customer', () => {
  test('customer found', async () => {
    const inMemoryCustomersRepository = new InMemoryCustomersRepository()

    await inMemoryCustomersRepository.create(new Customer({ name: 'John Doe' }, 'root'))

    const findCustomer = new FindCustomer(inMemoryCustomersRepository)

    const { customer } = await findCustomer.execute({ cutomerId: 'root' })

    expect(customer.name).toEqual('John Doe')
  })

  test('customer not found', async () => {
    const inMemoryCustomersRepository = new InMemoryCustomersRepository()
    
    const findCustomer = new FindCustomer(inMemoryCustomersRepository)

    expect(findCustomer.execute({ cutomerId: 'root' })).rejects.toThrow('customer not found')
  })
})