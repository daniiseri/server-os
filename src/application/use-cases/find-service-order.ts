import { ServiceOrder } from "../entities/ServiceOrder";
import { ServiceOrdersRepository } from "../repositories/serviceOrdersRepository";

interface FindServiceOrderRequest {
  serviceOrderId: string
}

interface FindServiceOrderResponse {
  serviceOrder: ServiceOrder
}

export class FindServiceOrder {
  constructor(private serviceOrdersRepository: ServiceOrdersRepository){}

  async execute(request: FindServiceOrderRequest): Promise<FindServiceOrderResponse>{
    const { serviceOrderId } = request

    const serviceOrder = await this.serviceOrdersRepository.findOne(serviceOrderId)

    if(!serviceOrder){
      throw new Error('service order not found')
    }

    return { serviceOrder }
  }
}