import { produtos_os } from "@prisma/client";
import { ProductWithServiceOrder } from "../../../application/entities/ProductWithServiceOrder";
import { Decimal } from "decimal.js";
import { FindProduct } from "../../../application/use-cases/find-product";
import { PrismaProductsRepository } from "../repositories/prisma-products-repository";
import { PrismaServiceOrdersRepository } from "../repositories/prisma-service-orders-repository";
import { FindServiceOrder } from "../../../application/use-cases/find-service-order";
import { Product } from "../../../application/entities/Product";

export class PrismaProductWithServiceOrderMapper {
  static toPrisma(productWithServiceOrder: ProductWithServiceOrder): produtos_os {
    return {
      idProdutos_os: productWithServiceOrder.id,
      quantidade: productWithServiceOrder.quantity,
      os_id: productWithServiceOrder.serviceOrder.id,
      produtos_id: productWithServiceOrder.product.id,
      subTotal: new Decimal(productWithServiceOrder.subTotal),
      descricao: null,
      preco: null,
    }
  }

  static async toDomain(productWithServiceOrder: produtos_os): Promise<ProductWithServiceOrder> {
    const { product } = await new FindProduct(new PrismaProductsRepository()).execute({ productId: productWithServiceOrder.produtos_id })
    const { serviceOrder } = await new FindServiceOrder(new PrismaServiceOrdersRepository()).execute({ serviceOrderId: productWithServiceOrder.os_id })


    return new ProductWithServiceOrder({
      product,
      serviceOrder,
      quantity: productWithServiceOrder.quantidade,
      subTotal: Number(productWithServiceOrder.subTotal),
    },
      productWithServiceOrder.idProdutos_os
    )
  }

  static toHttp(product: Product): any{
    return {
      id: product.id,
      description: product.description,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      stock: product.stock
    }
  }
}