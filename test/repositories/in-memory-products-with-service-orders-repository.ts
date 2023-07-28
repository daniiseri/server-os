import { ProductWithServiceOrder } from "../../src/application/entities/ProductWithServiceOrder";
import { ProductsWithServiceOrdersRepository } from "../../src/application/repositories/productsWithServiceOrdersRepository";

export class InMemoryProductsWithServiceOrdersRepository implements ProductsWithServiceOrdersRepository {
  public products: ProductWithServiceOrder[] = []

  async create(data: ProductWithServiceOrder): Promise<void> {
    this.products.push(data)
  }
}