import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
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
  // @Roles('GAdmin')
  // @UseGuards(RolesGuard)
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

  @Get()
  async getAllAdmins(@Req() req: Payload) {
    return this.adminService.findAll();
  }

  @Get(':id')
  async getAdmin(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Put(':id')
  async updateAdmin(@Param('id') id: string, @Body() admin: RegisterDTO) {
    return this.adminService.update(id, admin);
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    return this.adminService.delete(id);
  }

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
}
