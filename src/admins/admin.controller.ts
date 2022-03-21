import { Controller, Get, Post, Body, Put, Param, Res } from '@nestjs/common';
import { Admin, AdminDocument } from 'src/schemas/admin.schema';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginDTO } from './../auth/login.dto';

@Controller('Admins')
export class AdminController {
  constructor(
    private readonly adminsService: AdminService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async create(@Body() admin: Admin) {
    const newAdmin = await this.adminsService.create(admin);
    const payload = {
      email: admin.email,
    };

    const token = await this.authService.signPayload(payload);
    return {
      token,
      admin: newAdmin,
    };
  }

  @Post('login')
  async login(@Body() admin: Admin, @Res() res) {
    const { email, password } = admin;
    const existAdmin = await this.adminsService.findOne(email);

    // const payload = {
    //   email: existAdmin.email,
    // };

    // const token = await this.authService.signPayload(payload);
    return res.status(200).json({
      // token,
      admin: existAdmin,
    });
  }

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') name: string) {
    return this.adminsService.findOne(name);
  }

  @Put(':id')
  update(@Param('id') name: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(name, updateAdminDto);
  }
}
