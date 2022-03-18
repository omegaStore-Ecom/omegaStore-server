import { CustomersController } from './customers.controller';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './Schema/customer.schema';
import { CustomerService } from './customers.service';
import { CustomerRepository } from './customers.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
