import { Customer } from "../entities/Customer";
import { CustomersRepository } from "../repositories/customersRepository";

interface FindCustomersResponse {
  customers: Customer[]
}

export class FindCustomers {
  constructor(private customersRepository: CustomersRepository) { }

  async execute(): Promise<FindCustomersResponse> {
    const customers = await this.customersRepository.findAll()

    if(customers.length === 0){
      throw new Error('no registered customer')
    }

    return { customers }
  }
}