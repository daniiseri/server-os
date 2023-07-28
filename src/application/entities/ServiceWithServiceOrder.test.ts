import { Customer } from './Customer'
import { Service } from './Service'
import { ServiceOrder } from './ServiceOrder'
import { ServiceWithServiceOrder } from './SeviceWithServiceOrder'
import { User } from './User'

test('service with service order assignment', () => {
  const sevicerWithServiceOrder = new  ServiceWithServiceOrder({ 
    service: new Service({ name: 'cleanning', price: 5 }),
    serviceOrder: new ServiceOrder({
      customer: new Customer({ name: 'John Doe' }),
      description: 'cleanning and formatting',
      user: new User({ email: 'johndoe@example.com', password: '***' }),
    }),
    quantity: 5
  })

  expect(sevicerWithServiceOrder.service.name).toEqual('cleanning')
  expect(sevicerWithServiceOrder.quantity).toEqual(5)
  expect(sevicerWithServiceOrder.subTotal).toEqual(25)
})