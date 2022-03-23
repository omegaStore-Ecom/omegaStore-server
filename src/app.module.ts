import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsModule } from './products/products.module';
import { DeliverymenModule } from './deliverymen/deliverymen.module';
import { AuthModule } from './auth/auth.module';
import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [
    // todo: later we will refactor this into .env *
    MongooseModule.forRoot(
      'mongodb+srv://redroot:pwd1234@omegastore.lqtg0.mongodb.net/omegastore?retryWrites=true&w=majority',
    ),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './products/upload',
      }),
    }),
    ProductsModule,
    DeliverymenModule,
    AuthModule,
    SellersModule,
  ],
})
export class AppModule {}
