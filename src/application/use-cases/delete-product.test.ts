import { InMemoryProductsRepository } from '../../../test/repositories/in-memory-products-repository'
import { Product } from '../entities/Product'
import { DeleteProduct } from './delete-product'

test('delete product', async () => {
  const inMemoryProductsRepository = new InMemoryProductsRepository()
  inMemoryProductsRepository.create(new Product({
    description: 'hard disc'
  },
    '***'
  ))
  const deleteProduct = new DeleteProduct(inMemoryProductsRepository)
  await deleteProduct.execute({ productId: '***' })

  expect(inMemoryProductsRepository.products.length).toEqual(0)
})