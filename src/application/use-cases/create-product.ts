import { Product } from "../entities/Product";
import { ProductsRepository } from "../repositories/productsRepository";

interface CreateProductRequest{
  description: string
  salePrice?: number
  purchasePrice?: number
  stock?: number
}

interface CreateProductResponse {
  product: Product
}

export class CreateProduct{
  constructor(private productsRepository: ProductsRepository){}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse>{
    const { description, purchasePrice, salePrice, stock } = request

    const product = new Product({ description, purchasePrice, salePrice, stock })

    await this.productsRepository.create(product)

    return { product }
  }
}