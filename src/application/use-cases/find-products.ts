import { Product } from "../entities/Product";
import { ProductsRepository } from "../repositories/productsRepository";

interface FindProductsResponse {
  products: Product[]
}

export class FindProducts {
  constructor(private productsRepository: ProductsRepository) { }

  async execute(): Promise<FindProductsResponse> {
    const products = await this.productsRepository.findAll()

    return { products }
  }
}