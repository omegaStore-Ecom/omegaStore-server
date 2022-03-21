import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from 'src/schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminsService {

  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}

  async create(createAdminDto: CreateAdminDto) : Promise<Admin> {
    const { fName, lName, email, password, phone} = createAdminDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdCustomer = await new this.adminModel({fName, lName, email, phone ,password : hashedPassword}).save();
      return createdCustomer ;
  }

  async findAll() {
    return this.adminModel.find();
  }

  async findOne(_id: string) {
    return this.adminModel.findOne({_id});
  }

  async update(_id: string, updateAdminDto: UpdateAdminDto) {
    const { fName, lName, email, password, phone} = updateAdminDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdCustomer = this.adminModel.updateOne({_id},{$set:{fName: fName, lName : lName, email : email, phone : phone ,password : hashedPassword}})
      return createdCustomer ;
  }

  async remove(_id: string) {
    return this.adminModel.deleteOne({_id});
  }
}
