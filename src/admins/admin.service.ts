import { Injectable, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/schemas/admin.schema';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private AdminModel: Model<Admin>,
    private authService: AuthService,
  ) {}

  // admin register

  async register(admin, res) {
    const { email } = admin;
    const existingAdmin = await this.AdminModel.findOne({ email });
    if (existingAdmin) {
      res.status(400).json({
        message: 'Admin already exists',
      });
    }
    const newAdmin = await this.AdminModel.create(admin);
    const payload = {
      email: admin.email,
    };

    const token = await this.authService.signPayload(payload);

    return res.status(201).json({
      token,
      admin: this.sanitizeAdmin(newAdmin),
    });
  }

  sanitizeAdmin(admin: Admin) {
    const sanitized = admin.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  // admin login

  async login(admin, res) {
    const { email, password } = admin;
    const existAdmin = await this.AdminModel.findOne({ email });
    const payload = {
      email: existAdmin.email,
    };

    const token = await this.authService.signPayload(payload);
    return res.status(200).json({
      token,
      admin: existAdmin,
    });
  }
  async findAll() {
    return this.AdminModel.find();
  }

  async update(name: string, updateAdminDto: UpdateAdminDto) {
    return this.AdminModel.updateOne({ name }, { $set: updateAdminDto });
  }
}
