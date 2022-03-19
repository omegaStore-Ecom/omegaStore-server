import { CustomerController } from './Customer/customer.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './Customer/customer.schema';
import { CustomerService } from './Customer/customer.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://redroot:pwd1234@omegastore.lqtg0.mongodb.net/omegastore?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],
  controllers: [AppController, CustomerController],
  providers: [AppService, CustomerService],
})
export class AppModule {}
