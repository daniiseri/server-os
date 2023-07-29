import { Product } from "../entities/Product";
import { ProductsRepository } from "../repositories/productsRepository";

interface UpdateProductRequest {
  id: string
  description: string
  purchasePrice: number
  salePrice: number
  stock: number
}

interface UpdateProductResponse {
  product: Product
}


export class UpdateProduct {
  constructor(private productsRepository: ProductsRepository) { }

  async execute(request: UpdateProductRequest): Promise<UpdateProductResponse> {
    const { id, description, purchasePrice, salePrice, stock } = request

    const product = new Product({ description, purchasePrice, salePrice, stock }, id)

    await this.productsRepository.update(product)

    return { product }
  }
}