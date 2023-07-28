import { Product } from "../entities/Product"
import { ProductsRepository } from "../repositories/productsRepository"

interface FindProductRequest {
  productId: string
}

interface FindProductResponse {
  product: Product
}

export class FindProduct {
  constructor(private productsRepository: ProductsRepository){}

  async execute(request: FindProductRequest): Promise<FindProductResponse>{
    const { productId } = request

    const product = await this.productsRepository.findOne(productId)

    if(!product){
      throw new Error('product not found')
    }

    return { product }
  }
}