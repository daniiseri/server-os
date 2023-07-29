import { Service } from "../entities/Service";
import { ServicesRepository } from "../repositories/servicesRepository";

interface UpdateServiceRequest {
  id: string
  name: string
  description: string
  price: number
}

interface UpdateServiceResponse {
  service: Service
}


export class UpdateService {
  constructor(private servicesRepository: ServicesRepository) { }

  async execute(request: UpdateServiceRequest): Promise<UpdateServiceResponse> {
    const { id, description, name, price } = request

    const service = new Service({ name, description, price  }, id)

    await this.servicesRepository.update(service)

    return { service }
  }
}