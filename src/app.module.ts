import { ProductService } from './Product/Product.service';
import { ProductsController } from './Product/Product.controller';
import { CustomerController } from './Customer/customer.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './Customer/customer.schema';
import { CustomerService } from './Customer/customer.service';
import { ProductSchema } from './Product/Product.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://redroot:pwd1234@omegastore.lqtg0.mongodb.net/omegastore?retryWrites=true&w=majority',
    ),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  controllers: [AppController, CustomerController, ProductsController],
  providers: [AppService, CustomerService, ProductService],
})
export class AppModule {}
