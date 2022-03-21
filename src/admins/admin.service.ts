import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private AdminModel: Model<AdminDocument>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    return new this.AdminModel(createAdminDto).save();
  }

  async findAll() {
    return this.AdminModel.find();
  }

  async findOne(name: string) {
    return this.AdminModel.findOne({ name });
  }

  async update(name: string, updateAdminDto: UpdateAdminDto) {
    return this.AdminModel.updateOne({ name }, { $set: updateAdminDto });
  }

  async remove(name: string) {
    return this.AdminModel.deleteOne({ name });
  }
}
