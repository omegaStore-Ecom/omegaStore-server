import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/Admin.module';
import { ConfigModule } from '@nestjs/config';
import { GeneralAdminModule } from './generalAdmin/general.admin.module';
import { DeliveryMenModule } from './deliveryMan/deliveryMan.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    AdminModule,
    GeneralAdminModule,
    DeliveryMenModule,
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
