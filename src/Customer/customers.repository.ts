import { Model, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './Schema/customer.schema';
@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async findOne(
    customerFilterQuery: FilterQuery<Customer>,
  ): Promise<CustomerDocument> {
    return this.customerModel.findOne(customerFilterQuery);
  }

  async find(customerFilterQuery: FilterQuery<Customer>): Promise<Customer[]> {
    return this.customerModel.find(customerFilterQuery);
  }

  async create(customer: Customer): Promise<Customer> {
    const newCustomer = new this.customerModel(customer);
    return newCustomer.save();
  }

  async findOneAndUpdate(
    customerFilterQuery: FilterQuery<Customer>,
    customer: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerModel.findOneAndUpdate(customerFilterQuery, customer);
  }
}
