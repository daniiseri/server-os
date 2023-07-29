import { InMemoryCustomersRepository } from '../../../test/repositories/in-memory-customers-repository'
import { Customer } from '../entities/Customer'
import { DeleteCustomer } from './delete-customer'

test('delete customer', async () => {
  const inMemoryCustomersRepository = new InMemoryCustomersRepository()
  inMemoryCustomersRepository.create(new Customer({
    name: 'John Doe'
  },
    '***'
  ))
  const deleteCustomer = new DeleteCustomer(inMemoryCustomersRepository)
  await deleteCustomer.execute({ customerId: '***' })

  expect(inMemoryCustomersRepository.customers.length).toEqual(0)
})