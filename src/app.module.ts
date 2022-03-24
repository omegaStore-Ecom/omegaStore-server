import { Module } from '@nestjs/common';
<<<<<<< Updated upstream
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsModule } from './products/products.module';
import { DeliverymenModule } from './deliverymen/deliverymen.module';
import { AuthModule } from './auth/auth.module';
=======
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/Admin.module';
import { ConfigModule } from '@nestjs/config';
import { GeneralAdminModule } from './generalAdmin/general.admin.module';
import { DeliveryMenModule } from './deliveryMan/deliveryMan.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role/role.guard';
import { ProductsModule } from './products/products.module';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    ProductsModule,
    DeliverymenModule,
    AuthModule,
    SellersModule,
=======
    AdminModule,
    GeneralAdminModule,
    DeliveryMenModule,
    ProductsModule,
    SellersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
>>>>>>> Stashed changes
  ],
})
export class AppModule {}
