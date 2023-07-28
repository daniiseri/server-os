import { Customer } from './Customer'

test('customer assignment', () => {
  const customer = new Customer({ name: 'John Doe' }, 'root')

  expect(customer.name).toEqual('John Doe')
  expect(customer.id).toEqual('root')
})