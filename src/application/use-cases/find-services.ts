import { prisma } from "../../lib/prisma";
import { Service } from "../entities/Service";
import { ServicesRepository } from "../repositories/servicesRepository";

interface FindServicesResponse {
  services: Service[]
}

export class FindServices {
  constructor(private servicesRepository: ServicesRepository) { }

  async execute(): Promise<FindServicesResponse> {
    const services = await this.servicesRepository.findAll()

    return { services }
  }
}