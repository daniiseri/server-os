import { FastifyInstance } from "fastify";
import { CreateProduct } from "../application/use-cases/create-product";
import { PrismaProductsRepository } from "../database/prisma/repositories/prisma-products-repository";
import { z } from "zod";
import { FindProducts } from "../application/use-cases/find-products";
import { FindProduct } from "../application/use-cases/find-product";
import { PrismaProductMapper } from "../database/prisma/mappers/prisma-product-mapper";

export async function productsRoutes(app: FastifyInstance) {
  app.post('/products', async (requets) => {
    const bodySchema = z.object({
      description: z.string(),
      purchasePrice: z.number().optional(),
      salePrice: z.number().optional(),
      stock: z.number().optional()
    })

    const { description, purchasePrice, salePrice, stock } = bodySchema.parse(requets.body)

    const createProduct = new CreateProduct(new PrismaProductsRepository())

    const { product } = await createProduct.execute({ description, purchasePrice, salePrice, stock })

    return { message: 'success created product!', product }
  })

  app.get('/products', async () => {
    const findProducts = new FindProducts(new PrismaProductsRepository())

    const products = (await findProducts.execute()).products.map(product => {
      return PrismaProductMapper.toHttp(product)
    })

    return { products }
  })

  app.get('/products/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(request.params)

    const findProduct = new FindProduct(new PrismaProductsRepository())

    const { product } = await findProduct.execute({ productId: id })

    return { product }
  })
}