import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('Admins')
export class AdminController {
  constructor(private readonly AdminsService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.AdminsService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.AdminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') name: string) {
    return this.AdminsService.findOne(name);
  }

  @Put(':id')
  update(@Param('id') name: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.AdminsService.update(name, updateAdminDto);
  }
}
