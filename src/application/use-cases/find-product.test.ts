import { InMemoryProductsRepository } from '../../../test/repositories/in-memory-products-repository'
import { Product } from '../entities/Product'
import { FindProduct } from './find-product'

describe('find product', () => {
  test('product found', async () => {
    const inMemoryProductsRepository = new InMemoryProductsRepository()
    await inMemoryProductsRepository.create(new Product({
      description: 'hard disc'
    },
      'testId'
    ))

    const findProduct = new FindProduct(inMemoryProductsRepository)

    const { product } = await findProduct.execute({ productId: 'testId' })

    expect(product.description).toEqual('hard disc')
  })

  test('product not found', async () => {
    const inMemoryProductsRepository = new InMemoryProductsRepository()
    const findProduct = new FindProduct(inMemoryProductsRepository)

    expect(findProduct.execute({ productId: 'testId' })).rejects.toThrow('product not found')
  })
})