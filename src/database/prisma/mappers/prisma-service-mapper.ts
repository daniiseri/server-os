import { servicos } from "@prisma/client";
import { Service } from "../../../application/entities/Service";
import { Decimal } from 'decimal.js'

export class PrismaSeviceMapper {
  static toPrisma(service: Service): servicos {
    return {
      idServicos: service.id,
      nome: service.name,
      descricao: service.description ?? null,
      preco: new Decimal(service.price),
    }
  }

  static toDomain(service: servicos): Service {
    return new Service({
      name: service.nome,
      description: service.descricao ?? undefined,
      price: Number(service.preco)
    },
      service.idServicos
    )
  }

  static toHttp(service: Service): any {
    return {
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
    }
  }
}