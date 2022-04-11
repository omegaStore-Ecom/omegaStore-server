import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { GeneralAdminModule } from './generalAdmin/general.admin.module';
import { DeliveryMenModule } from './deliveryMan/deliveryMan.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role/role.guard';
import { CustomerModule } from './customer/customer.module';
import { SellerModule } from './seller/seller.module';
import { MulterModule } from '@nestjs/platform-express';
import { ProductModule } from './product/product.module';
import { CollectionModule } from './collections/collection.module';
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {MailerModule} from "@nestjs-modules/mailer";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.office365.com',
        port: 587,
        tls: {
          ciphers: 'SSLv3',
        },
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" <user@outlook.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
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
    SellerModule,
    ProductModule,
    CollectionModule,
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
