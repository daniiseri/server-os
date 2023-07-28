import { Product } from './Product'

test('product assignment', () => {
  const product = new Product({ description: 'hard disc' })

  expect(product.stock).toEqual(0)
  expect(product.description).toEqual('hard disc')
  expect(product.salePrice).toEqual(0)
  expect(product.purchasePrice).toBeUndefined()
})