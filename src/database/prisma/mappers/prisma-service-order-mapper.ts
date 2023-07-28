import { os } from "@prisma/client";
import { ServiceOrder } from "../../../application/entities/ServiceOrder";
import { FindCustomer } from "../../../application/use-cases/find-customer";
import { PrismaCustomersRepository } from "../repositories/prisma-customers-repository";
import { FindUser } from "../../../application/use-cases/find-user";
import { PrismaUsersRepository } from "../repositories/prisma-users-repository";

export class PrismaServiceOrderMapper {
  static toPrisma(serviceOrder: ServiceOrder): os {
    return {
      idOs: serviceOrder.id,
      dataInicial: serviceOrder.start,
      dataFinal: serviceOrder.finish,
      descricaoProduto: serviceOrder.description,
      clientes_id: serviceOrder.customer.id,
      usuarios_id: serviceOrder.user.id,
      faturado: serviceOrder.paid,
      garantia: null,
      defeito: null,
      status: null,
      observacoes: null,
      laudoTecnico: null,
      valorTotal: null,
      desconto: null,
      valor_desconto: null,
      tipo_desconto: null,
      lancamento: null,
      garantias_id: null,
    }
  }

  static async toDomain(serviceOrder: os): Promise<ServiceOrder> {
    const { customer } = await new FindCustomer(new PrismaCustomersRepository).execute({ cutomerId: serviceOrder.clientes_id })
    const { user } = await new FindUser(new PrismaUsersRepository).execute({ userId: serviceOrder.usuarios_id })


    return new ServiceOrder({
      customer,
      description: serviceOrder.descricaoProduto,
      user,
      start: serviceOrder.dataInicial ?? undefined,
      finish: serviceOrder.dataFinal ?? undefined,
      paid: serviceOrder.faturado,
    },
      serviceOrder.idOs
    )
  }
}