import { ProductsRepository } from "../repositories/productsRepository";

interface DeleteProductRequest {
  productId: string
}

export class DeleteProduct {
  constructor(private productsRepository: ProductsRepository) { }

  async execute(request: DeleteProductRequest): Promise<void> {
    const { productId } = request

    await this.productsRepository.delete(productId)
  }
}