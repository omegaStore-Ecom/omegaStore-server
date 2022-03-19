import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './customer.schema';
@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(customer: Customer): Promise<CustomerDocument> {
    const newCustomer = new this.customerModel(customer);
    return newCustomer.save();
  }

  async findAll(): Promise<CustomerDocument[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<CustomerDocument> {
    return this.customerModel.findById(id).exec();
  }

  async update(id: string, customer: Customer): Promise<CustomerDocument> {
    return this.customerModel
      .findByIdAndUpdate(id, customer, { new: true })
      .exec();
  }
}
