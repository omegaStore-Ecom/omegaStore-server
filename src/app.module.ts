import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/Admin.module';
import { ConfigModule } from '@nestjs/config';
import { GeneralAdminModule } from './generalAdmin/general.admin.module';
import { DeliveryMenModule } from './deliveryMan/deliveryMan.module';
import { RolesGuard } from './role/role.guard';
import { CustomerModule } from './customer/customer.module';
import { APP_GUARD } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ProductsModule } from './products/products.module';
import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './products/upload',
      }),
    }),
    AdminModule,
    GeneralAdminModule,
    DeliveryMenModule,
    CustomerModule,
    ProductsModule,
    AuthModule,
    SellersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
