import { Product } from "../../../application/entities/Product";
import { ProductsRepository } from "../../../application/repositories/productsRepository";
import { NotFoundError } from "../../../customs/errors";
import { prisma } from "../../../lib/prisma";
import { PrismaProductMapper } from "../mappers/prisma-product-mapper";

export class PrismaProductsRepository implements ProductsRepository{
  async create(data: Product): Promise<void> {
    const row = PrismaProductMapper.toPrisma(data)

    await prisma.produtos.create({
      data: row
    })
  }

  async findOne(productId: string): Promise<Product> {
    const product = await prisma.produtos.findUnique({
      where: { idProdutos: productId }
    })

    if(!product){
      throw new NotFoundError('product not found')
    }

    return PrismaProductMapper.toDomain(product)
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.produtos.findMany()

    return products.map(product => {
      return PrismaProductMapper.toDomain(product)
    })
  }
} 