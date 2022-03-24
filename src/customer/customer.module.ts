import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerSchema } from 'src/models/customer.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
    ]),
  ],
  providers: [CustomerService, JwtStrategy],
  controllers: [CustomerController],
})
export class CustomerModule {}
