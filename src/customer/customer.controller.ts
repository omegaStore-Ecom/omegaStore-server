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

import { CustomerService } from './customer.service';
import { Customer } from 'src/types/users';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('register')
  async register(@Body() registerDTO: Customer) {
    const Customer = await this.customerService.create(registerDTO);
    const payload = {
      email: Customer.email,
      role: Customer.role,
    };

    const token = await this.signPayload(payload);
    return { Customer, token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const Customer = await this.customerService.findByLogin(loginDTO);
    const payload = {
      email: Customer.email,
      role: Customer.role,
    };
    const token = await this.signPayload(payload);
    return { Customer, token };
  }

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  // crud
  @Put(':id')
  @Roles('customer')
  @UseGuards(RolesGuard)
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateDTO: Customer,
  ) {
    return this.customerService.update(id, updateDTO , res);
  }

}
