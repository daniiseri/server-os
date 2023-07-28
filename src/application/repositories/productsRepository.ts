import { Product } from "../entities/Product";

export abstract class ProductsRepository{
  abstract create(data: Product): Promise<void>
  abstract findOne(productId: string): Promise<Product>
  abstract findAll(): Promise<Product[]>
}