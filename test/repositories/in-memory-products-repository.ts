import { Product } from "../../src/application/entities/Product";
import { ProductsRepository } from "../../src/application/repositories/productsRepository";
import { AppError } from "../../src/customs/errors";

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = []

  async create(data: Product): Promise<void> {
    this.products.push(data)
  }

  async update(data: Product): Promise<void> {
    const findProduct = this.products.find(product => product.id === data.id)

    if (!findProduct) {
      throw new AppError('invalid product ID')
    }

    this.products = this.products.map(product => {
      return product.id === findProduct.id
        ? data
        : product
    })
  }

  async delete(productId: string): Promise<void> {
    this.products = this.products.filter(product => product.id !== productId)
  }

  async findOne(productId: string): Promise<Product> {
    const product = this.products.find(({ id }) => id === productId)

    if (!product) {
      throw new Error('product not found')
    }

    return product
  }

  async findAll(): Promise<Product[]> {
    return this.products
  }
}