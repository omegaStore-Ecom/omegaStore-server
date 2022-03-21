import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Customer, CustomerDocument} from 'src/schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {sendEmail} from 'src/utils/sendEmail'

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
      const { password,email,name ,country,state,city,phone, username} = createCustomerDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdCustomer = await new this.customerModel({email,name ,username,country,state,city,phone ,password : hashedPassword}).save();
      await sendEmail(createdCustomer.email) ;
      return createdCustomer ;     
     }


  async findAll() {
    return this.customerModel.find();
  }

  async findOne(email: string): Promise<Customer | undefined> {
    return this.customerModel.findOne({email});
  }

  async update(email: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.updateOne({email},{$set:{confirmation :true}});
  }
  // async update(_id: string, updateCustomerDto: UpdateCustomerDto) {
  //   return this.customerModel.updateOne({_id},{$set:{...updateCustomerDto}});
  // }

  async remove(id: number) {
    return this.customerModel.deleteOne({id});
  }
}
