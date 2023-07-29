import { InMemoryCustomersRepository } from '../../../test/repositories/in-memory-customers-repository'
import { Customer } from '../entities/Customer'
import { UpdateCustomer } from './update-customer'

describe('update customer', () => {
  test('valid customer ID', async () => {
    const inMemoryCustomersRepository = new InMemoryCustomersRepository()

    const customer = new Customer({
      name: 'John Doe'
    },
      '***'
    )

    inMemoryCustomersRepository.create(customer)

    const updateCustomer = new UpdateCustomer(inMemoryCustomersRepository)
    const { customer: newcustomer } = await updateCustomer.execute({
      id: '***',
      name: 'Jane Doe JR',
      createdAt: new Date
    })

    expect(inMemoryCustomersRepository.customers[0]).toEqual(newcustomer)
    expect(inMemoryCustomersRepository.customers[0].name).toEqual('Jane Doe JR')
  })
  test('invalid customer ID', async () => {
    const inMemoryCustomersRepository = new InMemoryCustomersRepository()

    const updateCustomer = new UpdateCustomer(inMemoryCustomersRepository)

    expect(updateCustomer.execute({
      id: '***',
      name: 'Jane Doe JR',
      createdAt: new Date
    })).rejects.toThrow('invalid customer ID')
  })
})