import { Product } from "../entities/Product";
import { ProductWithServiceOrder } from "../entities/ProductWithServiceOrder";
import { ServiceOrder } from "../entities/ServiceOrder";
import { ProductsWithServiceOrdersRepository } from "../repositories/productsWithServiceOrdersRepository";

interface CreateProductWithServiceOrderRequest {
  product: Product
  serviceOrder: ServiceOrder
  quantity?: number
  subTotal?: number
}

interface CreateProductWithServiceOrderResponse {
  productWithServiceOrder: ProductWithServiceOrder
}

export class CreateProductWithServiceOrder {
  constructor(private productsWithServiceOrdersRepository: ProductsWithServiceOrdersRepository){}

  async execute(request: CreateProductWithServiceOrderRequest): Promise<CreateProductWithServiceOrderResponse>{
    const { product, serviceOrder, quantity, subTotal } = request
    
    const productWithServiceOrder = new ProductWithServiceOrder({
      product,
      serviceOrder,
      quantity,
      subTotal
    })

    await this.productsWithServiceOrdersRepository.create(productWithServiceOrder)

    return { productWithServiceOrder }
  }
}