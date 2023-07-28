import { Service } from "../entities/Service";
import { ServiceOrder } from "../entities/ServiceOrder";
import { ServiceWithServiceOrder } from "../entities/SeviceWithServiceOrder";
import { servicesWithServiceOrdersRepository } from "../repositories/servicesWithServiceOrdersRepository";

interface CreateServiceWithServiceOrderRequest {
  service: Service
  serviceOrder: ServiceOrder
  quantity?: number
  subTotal?: number
}

interface CreateServiceWithServiceOrderResponse {
  serviceWithServiceOrder: ServiceWithServiceOrder
}

export class CreateServiceWithServiceOrder {
  constructor(private sevicesWithServiceOrdersRepository: servicesWithServiceOrdersRepository) { }

  async execute(request: CreateServiceWithServiceOrderRequest): Promise<CreateServiceWithServiceOrderResponse> {
    const { service, serviceOrder, quantity, subTotal } = request

    const serviceWithServiceOrder = new ServiceWithServiceOrder({
      service,
      serviceOrder,
      quantity,
      subTotal
    })

    await this.sevicesWithServiceOrdersRepository.create(serviceWithServiceOrder)

    return { serviceWithServiceOrder }
  }
}