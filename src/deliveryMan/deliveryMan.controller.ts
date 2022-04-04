import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Roles, RolesGuard } from '../role/role.guard';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { LoginDTO } from './login.dto';
import { DeliveryMenService } from './deliveryMan.service';
import { DeliveryMan } from 'src/types/users';

@Controller('deliveryMan')
export class DeliveryManController {
  constructor(private readonly deliverymenService: DeliveryMenService) {}

  @Post('register')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async register(@Body() registerDTO: DeliveryMan) {
    const deliveryMan = await this.deliverymenService.create(registerDTO);
    const payload = {
      email: deliveryMan.email,
      role: deliveryMan.role,
    };

    const token = await this.signPayload(payload);
    return { deliveryMan, token };
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
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  async getALLDeliveryMen(@Res() res) {
    const deliverymen = await this.deliverymenService.findAll();
    res.status(200).json(deliverymen);
  }

  @Get(':id')
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  async getDeliveryMeById(@Res() res, @Param('id') id: string) {
    const deliverymen = await this.deliverymenService.findOne(id);
    res.status(200).json(deliverymen);
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

  @Delete(':id')
  async DeleteDeliveryMan(@Res() res, @Param('id') id: string) {
    return this.deliverymenService.deleteDeliveryMan(id, res);
  }
}
