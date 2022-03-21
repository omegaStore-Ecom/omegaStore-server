import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './admin.schema';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private AdminModel: Model<AdminDocument>,
  ) {}

  async create(Admin: Admin): Promise<AdminDocument> {
    const newAdmin = new this.AdminModel(Admin);
    return newAdmin.save();
  }

  async findAll(): Promise<AdminDocument[]> {
    return this.AdminModel.find().exec();
  }

  async findOne(id: string): Promise<AdminDocument> {
    return this.AdminModel.findById(id).exec();
  }

  async update(id: string, Admin: Admin): Promise<AdminDocument> {
    return this.AdminModel.findByIdAndUpdate(id, Admin, { new: true }).exec();
  }
}
