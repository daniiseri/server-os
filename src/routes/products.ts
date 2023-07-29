import { FastifyInstance } from "fastify";
import { CreateProduct } from "../application/use-cases/create-product";
import { PrismaProductsRepository } from "../database/prisma/repositories/prisma-products-repository";
import { z } from "zod";
import { FindProducts } from "../application/use-cases/find-products";
import { FindProduct } from "../application/use-cases/find-product";
import { PrismaProductMapper } from "../database/prisma/mappers/prisma-product-mapper";
import { UpdateProduct } from "../application/use-cases/update-product";
import { Product } from "../application/entities/Product";
import { AppError } from "../customs/errors";
import { DeleteProduct } from "../application/use-cases/delete-product";

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

    return { message: 'success created product!', product: PrismaProductMapper.toHttp(product) }
  })

  app.put('/products/:id', async (request) => {
    const bodySchema = z.object({
      description: z.string(),
      purchasePrice: z.number(),
      salePrice: z.number(),
      stock: z.number()
    })

    const paramsSchema = z.object({
      id: z.string()
    })

    const { description, purchasePrice, salePrice, stock } = bodySchema.parse(request.body)
    const { id } = paramsSchema.parse(request.params)

    const updateProduct = new UpdateProduct(new PrismaProductsRepository())

    const { product } = await updateProduct.execute({
      id,
      description,
      purchasePrice,
      salePrice,
      stock
    })

    return { message: 'success updated product', product: PrismaProductMapper.toHttp(product) }
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

    return { product: PrismaProductMapper.toHttp(product) }
  })

  app.delete('/products/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string()
    })

    const { id } = paramsSchema.parse(request.params);

    const deleteProduct = new DeleteProduct(new PrismaProductsRepository())

    await deleteProduct.execute({ productId: id })

    return { message: 'success deleted product' }
  })
}