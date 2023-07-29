import { Customer } from "../entities/Customer";
import { CustomersRepository } from "../repositories/customersRepository";

interface UpdateCustomerRequest {
  id: string
  name: string
  createdAt?: Date
}

interface UpdateCustomerResponse {
  customer: Customer
}


export class UpdateCustomer {
  constructor(private customersRepository: CustomersRepository) { }

  async execute(request: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
    const { id, name, createdAt: createdOn } = request

    const createdAt = createdOn ?? (await this.customersRepository.findOne(id)).createdAt

    const customer = new Customer({ name, createdAt }, id)

    await this.customersRepository.update(customer)

    return { customer }
  }
}