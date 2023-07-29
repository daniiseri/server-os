import { Product } from "../entities/Product";

export abstract class ProductsRepository{
  abstract create(data: Product): Promise<void>
  abstract update(data: Product): Promise<void>
  abstract delete(productId: string): Promise<void>
  abstract findOne(productId: string): Promise<Product>
  abstract findAll(): Promise<Product[]>
}