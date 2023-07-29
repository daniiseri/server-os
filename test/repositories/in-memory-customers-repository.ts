import { Customer } from "../../src/application/entities/Customer";
import { CustomersRepository } from "../../src/application/repositories/customersRepository";
import { AppError } from "../../src/customs/errors";

export class InMemoryCustomersRepository implements CustomersRepository {
  public customers: Customer[] = []

  async count(): Promise<number> {
    return this.customers.length
  }

  async create(data: Customer): Promise<void> {
    this.customers.push(data)
  }

  async update(data: Customer): Promise<void> {
    const findCustomer = this.customers.find(customer => customer.id === data.id)

    if (!findCustomer) {
      throw new AppError('invalid customer ID')
    }

    this.customers = this.customers.map(customer => {
      return customer.id === findCustomer.id
        ? data
        : customer
    })
  }

  async delete(customerId: string): Promise<void> {
    this.customers = this.customers.filter(customer => customer.id !== customerId)
  }

  async findOne(id: string): Promise<Customer> {
    const customer = this.customers.find(customer => customer.id === id)

    if (!customer) {
      throw new Error('customer not found')
    }

    return customer
  }

  async findAll(): Promise<Customer[]> {
    return this.customers
  }
}