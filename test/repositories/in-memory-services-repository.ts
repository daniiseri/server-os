import { Service } from "../../src/application/entities/Service";
import { ServicesRepository } from "../../src/application/repositories/servicesRepository";
import { AppError } from "../../src/customs/errors";

export class InMemoryServicesRepository implements ServicesRepository {
  public services: Service[] = []

  async create(data: Service): Promise<void> {
    this.services.push(data)
  }

  async update(data: Service): Promise<void> {
    const findService = this.services.find(service => service.id === data.id)

    if(!findService){
      throw new AppError('invalid service ID')
    }

    this.services = this.services.map(service => {
      return service.id === findService.id
        ? data
        : service
    })
  }

  async delete(serviceId: string): Promise<void> {
    this.services = this.services.filter(service => service.id !== serviceId)
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