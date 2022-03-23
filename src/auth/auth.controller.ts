import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RegisterDTO } from 'src/Admin/register.dto';
import { AdminService } from 'src/Admin/Admin.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private AdminService: AdminService,
    private authService: AuthService,
  ) {}

  // @Get('/onlyauth')
  // @UseGuards(AuthGuard('jwt'))
  // async hiddenInformation() {
  //   return 'hidden information';
  // }
  // @Get('/anyone')
  // async publicInformation() {
  //   return 'this can be seen by anyone';
  // }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const Admin = await this.AdminService.create(registerDTO);
    const payload = {
      email: Admin.email,
    };

    const token = await this.authService.signPayload(payload);
    return { Admin, token };
  }
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const Admin = await this.AdminService.findByLogin(loginDTO);
    const payload = {
      email: Admin.email,
    };
    const token = await this.authService.signPayload(payload);
    return { Admin, token };
  }
}
