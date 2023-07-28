import { Customer } from './Customer'
import { Product } from './Product'
import { ProductWithServiceOrder } from './ProductWithServiceOrder'
import { ServiceOrder } from './ServiceOrder'
import { User } from './User'

test('product assignment', () => {
  const productWithServiceOrder = new ProductWithServiceOrder({
    product: new Product({
      description: 'hard disc',
      salePrice: 15
    }),
    serviceOrder: new ServiceOrder({
      customer: new Customer({
        name: 'John Doe'
      }),
      user: new User({
        email: 'johndoe@example.com',
        password: '***'
      }),
      description: 'cleanning',
    }),
    quantity: 4
  })

  expect(productWithServiceOrder.subTotal).toEqual(60)
  expect(productWithServiceOrder.serviceOrder.description).toEqual('cleanning')
})