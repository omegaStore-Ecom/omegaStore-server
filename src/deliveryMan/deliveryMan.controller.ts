import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from '../role/role.guard';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { LoginDTO } from './login.dto';
import { DeliveryMenService } from './deliveryMan.service';
import { DeliveryMan } from 'src/types/users';

@Controller('deliveryMan')
export class DeliveryManController {
  constructor(private readonly deliverymenService: DeliveryMenService) {}

  @Get('/onlyauthG')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async hiddenInformation() {
    return 'hidden information';
  }

  @Post('register')
  @Roles('admin')
  async register(@Body() registerDTO: DeliveryMan) {
    const GAdmin = await this.deliverymenService.create(registerDTO);
    const payload = {
      email: GAdmin.email,
      role: GAdmin.role,
    };

    const token = await this.signPayload(payload);
    return { GAdmin, token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const GAdmin = await this.deliverymenService.findByLogin(loginDTO);
    const payload = {
      email: GAdmin.email,
      role: GAdmin.role,
    };
    const token = await this.signPayload(payload);
    return { GAdmin, token };
  }

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  // crud

  @Get()
  @Roles('GAdminddd')
  @UseGuards(RolesGuard)
  async getALLDeliveryMen(@Res() res) {
    return this.deliverymenService.findAll(res);
  }

  @Put(':id')
  async updateDeliveryMan(
    @Body() deliveryMan: DeliveryMan,
    @Res() res,
    @Param('id') id: string,
  ) {
    return this.deliverymenService.update(id, deliveryMan, res);
  }

  @Put(':id')
  async disableDeliveryMan(@Res() res, @Param('id') id: string) {
    return this.deliverymenService.disableDeliveryMan(id, res);
  }
}
