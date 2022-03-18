import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customers.repository';
import { Customer } from './Schema/customer.schema';
@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getCostumerById(CustomerId: string): Promise<Customer> {
    return this.customerRepository.findOne({ CustomerId });
  }

  async getAllCostumers(): Promise<Customer[]> {
    return this.customerRepository.find({});
  }

  async createCostumer(Customer: Customer): Promise<Customer> {
    return this.customerRepository.create(Customer);
  }

  async updateCostumer(
    customerId: string,
    customerUpdates: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerRepository.findOneAndUpdate(
      { customerId },
      customerUpdates,
    );
  }
}
