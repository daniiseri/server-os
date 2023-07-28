import { Service } from "../entities/Service"
import { ServicesRepository } from "../repositories/servicesRepository"

interface CreateServiceRequest {
  name: string
  description?: string
  price?: number
}

interface CreateServiceResponse {
  service: Service
}

export class CreateSevice {
  constructor(private servicesRepository: ServicesRepository) { }

  async execute(request: CreateServiceRequest): Promise<CreateServiceResponse> {
    const { name, description, price } = request

    const service = new Service({ name, description, price })
    
    await this.servicesRepository.create(service)

    return { service }
  }
}