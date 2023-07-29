import { InMemoryProductsRepository } from '../../../test/repositories/in-memory-products-repository'
import { Product } from '../entities/Product'
import { UpdateProduct } from './update-product'

describe('update product', () => {
  test('valid product ID', async () => {
    const inMemoryProductsRepository = new InMemoryProductsRepository()

    const product = new Product({
      description: 'hard disc',
      purchasePrice: 50,
      salePrice: 100
    },
      '***'
    )

    inMemoryProductsRepository.create(product)

    const updateProduct = new UpdateProduct(inMemoryProductsRepository)
    const { product: newProduct } = await updateProduct.execute({
      id: '***',
      description: 'cpu',
      purchasePrice: 50,
      salePrice: 100,
      stock: 200
    })

    expect(inMemoryProductsRepository.products[0]).toEqual(newProduct)
    expect(inMemoryProductsRepository.products[0].description).toEqual('cpu')
  })
  test('invalid product ID', async () => {
    const inMemoryProductsRepository = new InMemoryProductsRepository()

    const updateProduct = new UpdateProduct(inMemoryProductsRepository)

    expect(updateProduct.execute({
      id: '***',
      description: 'cpu',
      purchasePrice: 50,
      salePrice: 100, stock: 200
    })).rejects.toThrow('invalid product ID')
  })
})