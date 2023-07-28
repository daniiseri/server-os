import { Service } from "../../src/application/entities/Service";
import { ServicesRepository } from "../../src/application/repositories/servicesRepository";

export class InMemoryServicesRepository implements ServicesRepository {
  public services: Service[] = []

  async create(data: Service): Promise<void> {
    this.services.push(data)
  }

  async findOne(id: string): Promise<Service> {
    const service = this.services.find(service => service.id === id)

    if(!service){
      throw new Error('service not found')
    }

    return service
  } 

  async findAll(): Promise<Service[]> {
    return this.services
  }

  async findByName(name: string): Promise<Service[]> {
    const services = this.services.filter(service => service.name.includes(name))

    return services
  }
}