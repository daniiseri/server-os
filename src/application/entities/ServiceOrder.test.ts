import { Customer } from './Customer'
import { ServiceOrder } from './ServiceOrder'
import { User } from './User'

test('service order assignment', () => {
  const customer = new Customer({ name: 'Jhon Doe' })
  const user = new User({ email: 'johndoe@example.com', password: '***' })
  const serviceOrder = new ServiceOrder({ description: 'cleaning', customer, user })

  expect(serviceOrder.description).toEqual('cleaning')
  expect(serviceOrder.customer).toEqual(customer)
  expect(serviceOrder.user).toEqual(user)
})