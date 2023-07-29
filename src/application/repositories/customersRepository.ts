import { Customer } from "../entities/Customer";

export abstract class CustomersRepository {
  abstract create(data: Customer): Promise<void>
  abstract update(data: Customer): Promise<void>
  abstract delete(customerId: string): Promise<void>
  abstract count(): Promise<number>
  abstract findOne(id: string): Promise<Customer>
  abstract findAll(): Promise<Customer[]>
}