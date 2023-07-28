import { Customer } from "../entities/Customer";
import { ServiceOrder } from "../entities/ServiceOrder";
import { User } from "../entities/User";
import { ServiceOrdersRepository } from "../repositories/serviceOrdersRepository";

interface CreateServiceOrderRequest {
  customer: Customer
  user: User
  start?: Date
  finish?: Date
  description: string
  paid?: boolean
}

interface CreateServiceOrderResponse {
  serviceOrder: ServiceOrder
}

export class CreateServiceOrder {
  constructor(private serviceOrdersRepository: ServiceOrdersRepository) { }

  async execute(request: CreateServiceOrderRequest): Promise<CreateServiceOrderResponse> {
    const { customer, user, description, start, finish, paid } = request

    const serviceOrder = new ServiceOrder({ customer, user, description, start, finish, paid })

    await this.serviceOrdersRepository.create(serviceOrder)

    return { serviceOrder }
  }
}