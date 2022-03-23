import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './Admin.service';
import { Roles, RolesGuard } from './../role/role.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/onlyauth')
  @Roles('admind')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async hiddenInformation() {
    return 'hidden information';
  }
}
