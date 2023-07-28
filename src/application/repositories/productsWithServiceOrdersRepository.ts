import { ProductWithServiceOrder } from "../entities/ProductWithServiceOrder";

export abstract class ProductsWithServiceOrdersRepository{
  abstract create(data: ProductWithServiceOrder): Promise<void>
}