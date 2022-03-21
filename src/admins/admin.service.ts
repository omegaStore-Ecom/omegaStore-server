import { Injectable, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/schemas/admin.schema';
import { AdminRegisterDto } from './dto/register-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private AdminModel: Model<Admin>) {}

  async create(adminRegisterDto: AdminRegisterDto) {
    const { email } = adminRegisterDto;
    const admin = await this.AdminModel.findOne({ email });
    if (admin) {
      throw new Error('Admin already exists');
    }
    const newAdmin = new this.AdminModel(adminRegisterDto);
    await newAdmin.save();
    return this.sanitizeAdmin(newAdmin);
  }

  sanitizeAdmin(admin: Admin) {
    const sanitized = admin.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async findAll() {
    return this.AdminModel.find();
  }

  async findOne(email: string) {
    return this.AdminModel.findOne({ email });
  }

  async update(name: string, updateAdminDto: UpdateAdminDto) {
    return this.AdminModel.updateOne({ name }, { $set: updateAdminDto });
  }
}
