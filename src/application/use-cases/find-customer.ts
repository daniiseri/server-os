import { Customer } from "../entities/Customer";
import { CustomersRepository } from "../repositories/customersRepository";

interface FindCustomerRequest {
  cutomerId: string
}

interface FindCustomerResponse {
  customer: Customer
}

export class FindCustomer{
  constructor(private customersRepository: CustomersRepository){}

  async execute(request: FindCustomerRequest): Promise<FindCustomerResponse>{
    const { cutomerId } = request

    const customer = await this.customersRepository.findOne(cutomerId)

    if(!customer){
      throw new Error('customer not found')
    }

    return { customer }
  }
}