import { CustomerService } from './customers.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Customer } from './Schema/customer.schema';
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAllCustomers(): Promise<Customer[]> {
    return this.customerService.getAllCostumers();
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.getCostumerById(id);
  }

  @Post()
  async createCustomer(@Body() customer: Customer): Promise<Customer> {
    return this.customerService.createCostumer(customer);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() customerUpdates: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerService.updateCostumer(id, customerUpdates);
  }
}
