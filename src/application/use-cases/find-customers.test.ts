import { InMemoryCustomersRepository } from '../../../test/repositories/in-memory-customers-repository'
import { Customer } from '../entities/Customer';
import { FindCustomers } from './find-customers'

describe('find customers', () => {
  test('registered customer', async () => {
    const inMemoryCustomersRepository = new InMemoryCustomersRepository();

    await inMemoryCustomersRepository.create(new Customer({ name: 'John Doe' }));

    const findCustomers = new FindCustomers(inMemoryCustomersRepository);

    const { customers } = await findCustomers.execute()

    expect(customers).toHaveLength(1)
    expect(customers[0].name).toEqual('John Doe')
  })

  test('no registered customer', async () => {
    const inMemoryCustomersRepository = new InMemoryCustomersRepository();
    const findCustomers = new FindCustomers(inMemoryCustomersRepository);
    expect(findCustomers.execute()).rejects.toThrow('no registered customer')
  })
})
