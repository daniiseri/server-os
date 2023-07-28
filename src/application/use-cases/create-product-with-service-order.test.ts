import { InMemoryProductsWithServiceOrdersRepository } from '../../../test/repositories/in-memory-products-with-service-orders-repository'
import { Customer } from '../entities/Customer'
import { Product } from '../entities/Product'
import { ServiceOrder } from '../entities/ServiceOrder'
import { User } from '../entities/User'
import { CreateProductWithServiceOrder } from './create-product-with-service-order'

test('create product with service order', async () => {
  const inMemoryProductsWithServiceOrdersRepository = new InMemoryProductsWithServiceOrdersRepository()
  const createProductWithServiceOrder = new CreateProductWithServiceOrder(inMemoryProductsWithServiceOrdersRepository)

  const { productWithServiceOrder } = await createProductWithServiceOrder.execute({
    product: new Product({
      description: 'hard disc'
    }),
    serviceOrder: new ServiceOrder({
      customer: new Customer({
        name: 'John Doe'
      }),
      description: 'cleanning',
      user: new User({
        email: 'johndoe@example.com',
        password: '***'
      })
    })
  })

  expect(inMemoryProductsWithServiceOrdersRepository.products).toHaveLength(1)
  expect(inMemoryProductsWithServiceOrdersRepository.products[0]).toEqual(productWithServiceOrder)
})