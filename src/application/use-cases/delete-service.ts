import { ServicesRepository } from "../repositories/servicesRepository";

interface DeleteServiceRequest {
  serviceId: string
}

export class DeleteService {
  constructor(private servicesRepository: ServicesRepository) { }

  async execute(request: DeleteServiceRequest): Promise<void> {
    const { serviceId } = request

    await this.servicesRepository.delete(serviceId)
  }
}