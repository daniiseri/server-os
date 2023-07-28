import { ServiceWithServiceOrder } from "../../src/application/entities/SeviceWithServiceOrder";
import { servicesWithServiceOrdersRepository } from "../../src/application/repositories/servicesWithServiceOrdersRepository";

export class InMemoryServicesWithServiceOrdersRepository implements servicesWithServiceOrdersRepository {
  public servicesWithServiceOrders: ServiceWithServiceOrder[] = []
  
  async create(data: ServiceWithServiceOrder): Promise<void> {
    this.servicesWithServiceOrders.push(data)
  }
}