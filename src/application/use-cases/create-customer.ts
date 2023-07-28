import { Customer } from "../entities/Customer";
import { CustomersRepository } from "../repositories/customersRepository";

interface CreateCustomerRequest {
  name: string
}

interface CreateCustomerResponse {
  customer: Customer
}

export class CreateCustomer {
  constructor(private customersRepository: CustomersRepository){}

  async execute(request: CreateCustomerRequest): Promise<CreateCustomerResponse>{
    const { name } = request

    const customer = new Customer({ name })

    await this.customersRepository.create(customer)

    return { customer }
  }
}