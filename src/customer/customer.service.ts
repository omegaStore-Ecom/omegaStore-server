import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/types/users';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private CustomerModel: Model<Customer>,
  ) {}

  async create(customer: Customer) {
    const { email } = customer;
    const Customer = await this.CustomerModel.findOne({ email });
    if (Customer) {
      throw new HttpException(
        'customer already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdCustomer = new this.CustomerModel(customer);
    await createdCustomer.save();
    return this.sanitizeAdmin(createdCustomer);
  }

  async findAll(res) {
    try {
      const deliverymen = await this.CustomerModel.find();
      return res.status(HttpStatus.OK).json({
        deliverymen,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(id, deliveryMan, res) {
    try {
      const updatedCustomer = await this.CustomerModel.findByIdAndUpdate(
        id,
        deliveryMan,
        { new: true },
      );
      return res.status(HttpStatus.OK).json({
        updatedCustomer,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }



  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.CustomerModel.findOne({ email });
  }

  async findByLogin(deliveryMan: LoginDTO) {
    const { email, password } = deliveryMan;
    const existCustomer = await this.CustomerModel.findOne({ email });
    if (!existCustomer) {
      throw new HttpException(
        'customer doesnt exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      (await bcrypt.compare(password, existCustomer.password)) &&
      existCustomer.role === 'customer'
    ) {
      return this.sanitizeAdmin(existCustomer);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  sanitizeAdmin(existCustomer: Customer) {
    const sanitized = existCustomer.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
