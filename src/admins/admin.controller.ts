import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Admin } from 'src/schemas/admin.schema';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthService } from 'src/auth/auth.service';
import { AtStrategy } from 'src/auth/Local.strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('Admins')
export class AdminController {
  constructor(
    private readonly adminsService: AdminService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() admin: Admin, @Res() res) {
    return await this.adminsService.register(admin, res);
  }

  @Post('login')
  async login(@Body() admin: Admin, @Res() res) {
    return await this.adminsService.login(admin, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') name: string) {
  //   return this.adminsService.findOne(name);
  // }

  @Put(':id')
  update(@Param('id') name: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(name, updateAdminDto);
  }
}
