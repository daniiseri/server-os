import { Product } from "../../src/application/entities/Product";
import { ProductsRepository } from "../../src/application/repositories/productsRepository";

export class InMemoryProductsRepository implements ProductsRepository{
  public products: Product[] = []

  async create(data: Product): Promise<void> {
    this.products.push(data)
  }

  async findOne(productId: string): Promise<Product> {
    const product = this.products.find(({id}) => id === productId)

    if(!product){
      throw new Error('product not found')
    }

    return product
  }

  async findAll(): Promise<Product[]> {
    return this.products
  }
}