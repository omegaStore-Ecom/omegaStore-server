import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { Roles, RolesGuard } from './../role/role.guard';
import { RegisterDTO } from './register.dto';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { LoginDTO } from './login.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  @Roles('GAdmin')
  @UseGuards(RolesGuard)
  async register(@Body() registerDTO: RegisterDTO) {
    const Admin = await this.adminService.create(registerDTO);
    const payload = {
      email: Admin.email,
      role: Admin.role,
    };

    const token = await this.signPayload(payload);
    return { Admin, token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const Admin = await this.adminService.findByLogin(loginDTO);
    const payload = {
      email: Admin.email,
      role: Admin.role,
    };
    const token = await this.signPayload(payload);
    return { Admin, token };
  }

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
}
