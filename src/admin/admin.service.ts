import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/types/users';
import { RegisterDTO } from './register.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private AdminModel: Model<Admin> ) {}

  async create(RegisterDTO: RegisterDTO) {
    const { email } = RegisterDTO;
    const Admin = await this.AdminModel.findOne({ email });
    if (Admin) {
      throw new HttpException('Admin already exists', HttpStatus.BAD_REQUEST);
    }

    const createdAdmin = new this.AdminModel(RegisterDTO);

    await createdAdmin.save();
    return this.sanitizeAdmin(createdAdmin);
  }
  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.AdminModel.findOne({ email });
  }

  async findByLogin(AdminDTO: LoginDTO) {
    const { email, password } = AdminDTO;
    const Admin = await this.AdminModel.findOne({ email });
    if (!Admin) {
      throw new HttpException('Admin doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (
      (await bcrypt.compare(password, Admin.password)) &&
      Admin.role === 'admin'
    ) {
      return this.sanitizeAdmin(Admin);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  sanitizeAdmin(Admin: Admin) {
    const sanitized = Admin.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async validateAdmin(payload: Payload) {
    return await this.findByPayload(payload);
  }
}
