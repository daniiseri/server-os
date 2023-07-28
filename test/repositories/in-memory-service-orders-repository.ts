import { ServiceOrder } from "../../src/application/entities/ServiceOrder";
import { ServiceOrdersRepository } from "../../src/application/repositories/serviceOrdersRepository";

export class InMemoryServiceOrdersRepository implements ServiceOrdersRepository {
  public serviceOrders: ServiceOrder[] = [];

  async count(): Promise<number> {
    return this.serviceOrders.length
  }

  async create(data: ServiceOrder): Promise<void> {
    this.serviceOrders.push(data)
  }

  async findOne(id: string): Promise<ServiceOrder> {
    const serviceOrder = this.serviceOrders.find(serviceOrder => serviceOrder.id === id)

    if(!serviceOrder){
      throw new Error('service order not found')
    }

    return serviceOrder
  }

  async findAll(): Promise<ServiceOrder[]> {
    return this.serviceOrders
  }
}