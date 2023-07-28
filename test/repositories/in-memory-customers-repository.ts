import { Customer } from "../../src/application/entities/Customer";
import { CustomersRepository } from "../../src/application/repositories/customersRepository";

export class InMemoryCustomersRepository implements CustomersRepository {
  public customers: Customer[] = []

  async count(): Promise<number> {
    return this.customers.length
  }

  async create(data: Customer): Promise<void> {
    this.customers.push(data)
  }

  async findOne(id: string): Promise<Customer> {
    const customer = this.customers.find(customer => customer.id === id)

    if(!customer){
      throw new Error('customer not found')
    }

    return customer
  }

  async findAll(): Promise<Customer[]> {
    return this.customers
  }
}