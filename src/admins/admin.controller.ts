import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.AdminsService.findOne(name);
  }

  @Put(':name')
  update(@Param('name') name: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.AdminsService.update(name, updateAdminDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.AdminsService.remove(name);
  }
}
