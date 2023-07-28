import { ServiceOrder } from "../entities/ServiceOrder";

export abstract class ServiceOrdersRepository {
  abstract create(data: ServiceOrder): Promise<void>
  abstract count(): Promise<number>
  abstract findOne(id: string): Promise<ServiceOrder>
  abstract findAll(): Promise<ServiceOrder[]>
}