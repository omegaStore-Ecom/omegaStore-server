import { CustomerService } from './customer.service';
import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Customer } from './customer.schema';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll(@Res() res) {
    try {
      const customers = await this.customerService.findAll();
      return res.status(200).json({ customers });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Get('/:id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const customer = await this.customerService.findOne(id);
      return res.status(200).json({ customer });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Post()
  async createCustomer(@Res() res, @Body() customer: Customer) {
    try {
      const createdCustomer = await this.customerService.create(customer);

      return res.status(201).json({ createdCustomer });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Put('/:id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() customer: Customer,
  ) {
    try {
      const updatedCustomer = await this.customerService.update(id, customer);
      return res.status(200).json({ updatedCustomer });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
