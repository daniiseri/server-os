import { CreateCustomer } from './create-customer';
import { InMemoryCustomersRepository } from '../../../test/repositories/in-memory-customers-repository';

test('create customer', async () => {
  const inMemoryCustomersRepository = new InMemoryCustomersRepository();
  const createCustomer = new CreateCustomer(inMemoryCustomersRepository);

  const { customer } = await createCustomer.execute({ name: 'John Doe' })

  expect(inMemoryCustomersRepository.customers).toHaveLength(1)
  expect(inMemoryCustomersRepository.customers[0]).toEqual(customer)
})