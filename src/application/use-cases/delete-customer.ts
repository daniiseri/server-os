import { CustomersRepository } from "../repositories/customersRepository";

interface DeleteCustomerRequest {
  customerId: string
}

export class DeleteCustomer {
  constructor(private customersRepository: CustomersRepository) { }

  async execute(request: DeleteCustomerRequest): Promise<void> {
    const { customerId } = request

    await this.customersRepository.delete(customerId)
  }
}