import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GeneralAdminService } from './general.admin.service';
import { Roles, RolesGuard } from '../role/role.guard';
import { RegisterDTO } from './register.dto';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { LoginDTO } from './login.dto';

@Controller('GAdmin')
export class GeneralAdminController {
  constructor(private readonly generalAdminService: GeneralAdminService) {}

  @Get('/onlyauthG')
  @Roles('GAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async hiddenInformation() {
    return 'hidden information';
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const GAdmin = await this.generalAdminService.create(registerDTO);
    const payload = {
      email: GAdmin.email,
    };

    const token = await this.signPayload(payload);
    return { GAdmin, token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const GAdmin = await this.generalAdminService.findByLogin(loginDTO);
    const payload = {
      email: GAdmin.email,
    };
    const token = await this.signPayload(payload);
    return { GAdmin, token };
  }

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
}
