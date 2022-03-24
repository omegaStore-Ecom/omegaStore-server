import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/types/users';
import { RegisterDTO } from './register.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';

@Injectable()
export class GeneralAdminService {
  constructor(@InjectModel('GeneralAdmin') private GeneralAdminModel: Model<Admin> ) {}

  async create(RegisterDTO: RegisterDTO) {
    const { email } = RegisterDTO;
    const Admin = await this.GeneralAdminModel.findOne({ email });
    if (Admin) {
      throw new HttpException('General Admin already exists', HttpStatus.BAD_REQUEST);
    }

    const createdGAdmin = new this.GeneralAdminModel(RegisterDTO);

    await createdGAdmin.save();
    return this.sanitizeAdmin(createdGAdmin);
  }
  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.GeneralAdminModel.findOne({ email });
  }

  async findByLogin(AdminDTO: LoginDTO) {
    const { email, password } = AdminDTO;
    const GAdmin = await this.GeneralAdminModel.findOne({ email });
    if (!GAdmin) {
      throw new HttpException('General Admin doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (
      (await bcrypt.compare(password, GAdmin.password)) &&
      GAdmin.role === 'GAdmin'
    ) {
      return this.sanitizeAdmin(GAdmin);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  sanitizeAdmin(GAdmin: Admin) {
    const sanitized = GAdmin.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async validateAdmin(payload: Payload) {
    return await this.findByPayload(payload);
  }
}
