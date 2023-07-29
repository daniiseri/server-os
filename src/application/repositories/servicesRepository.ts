import { Service } from "../entities/Service";

export abstract class ServicesRepository {
  abstract create(data: Service): Promise<void>
  abstract update(data: Service): Promise<void>
  abstract delete(serviceId: string): Promise<void>
  abstract findAll(): Promise<Service[]>
  abstract findOne(id: string): Promise<Service>
  abstract findByName(name: string): Promise<Service[]>
} 