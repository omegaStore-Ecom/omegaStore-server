import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { Customer, CustomerSchema } from 'src/schemas/customer.schema';



@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}