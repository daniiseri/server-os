import { InMemoryProductsRepository } from '../../../test/repositories/in-memory-products-repository'
import { Product } from '../entities/Product'
import { FindProducts } from './find-products'

test('find products', async () => {
  const inMemoryProductsRepository = new InMemoryProductsRepository()

  inMemoryProductsRepository.create(new Product({ description: 'hard disc' }))
  inMemoryProductsRepository.create(new Product({ description: 'cpu' }))
  inMemoryProductsRepository.create(new Product({ description: 'memory' }))

  const findProducts = new FindProducts(inMemoryProductsRepository)

  const { products } = await findProducts.execute()

  expect(products).toHaveLength(3)
  expect(products.length).toEqual(inMemoryProductsRepository.products.length)
})