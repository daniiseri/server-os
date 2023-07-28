import { Service } from "../entities/Service"
import { ServicesRepository } from "../repositories/servicesRepository"

interface FindServiceRequest {
  serviceId: string
}

interface FindServiceResponse {
  service: Service
}

export class FindService {
  constructor(private servicesRepository: ServicesRepository){}

  async execute(request: FindServiceRequest): Promise<FindServiceResponse>{
    const { serviceId } = request

    const service = await this.servicesRepository.findOne(serviceId)

    if(!service){
      throw new Error('service not found')
    }

    return { service }
  } 
}