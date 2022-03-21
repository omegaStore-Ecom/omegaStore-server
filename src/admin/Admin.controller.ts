import { Body, Controller, Post, Get } from '@nestjs/common';
import { Admin } from './admin.schema';
import { AdminService } from './Admin.service';

@Controller('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @Post('/register')
  async register(@Body() admin: Admin) {
    return this.adminService.register(admin);
  }

  @Post('/login')
  async login(@Body() admin: Admin) {
    return this.adminService.login(admin);
  }
}
