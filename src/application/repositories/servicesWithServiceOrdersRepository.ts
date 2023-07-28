import { ServiceWithServiceOrder } from "../entities/SeviceWithServiceOrder";

export abstract class servicesWithServiceOrdersRepository{
  abstract create(data: ServiceWithServiceOrder): Promise<void>
}