import { CreateProduct } from './create-product'
import { InMemoryProductsRepository } from '../../../test/repositories/in-memory-products-repository'

test('create product', async () => {
  const inMemoryProductsRepository = new InMemoryProductsRepository()
  const createProduct = new CreateProduct(inMemoryProductsRepository)

  const { product } = await createProduct.execute({ description: 'hard disc' })

  expect(inMemoryProductsRepository.products).toHaveLength(1)
  expect(inMemoryProductsRepository.products[0]).toEqual(product)
})