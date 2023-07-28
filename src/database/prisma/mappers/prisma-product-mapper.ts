import { produtos } from "@prisma/client";
import { Product } from "../../../application/entities/Product";
import Decimal from "decimal.js";

export class PrismaProductMapper {
  static toPrisma(product: Product): produtos {
    return {
      idProdutos: product.id,
      descricao: product.description,
      precoCompra: new Decimal(product.purchasePrice ?? 0),
      precoVenda: new Decimal(product.salePrice),
      estoque: product.stock,
      codDeBarra: null,
      unidade: null,
      estoqueMinimo: null,
      saida: null,
      entrada: null,
    }
  }

  static toDomain(product: produtos): Product {
    return new Product({
      description: product.descricao,
      purchasePrice: Number(product.precoCompra),
      salePrice: Number(product.precoVenda),
      stock: product.estoque
    },
      product.idProdutos
    )
  }

  static toHttp(product: Product){
    return {
      id: product.id,
      description: product.description,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      stock: product.stock
    }
  }
}