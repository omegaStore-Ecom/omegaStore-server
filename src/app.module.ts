import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [CustomersModule,MongooseModule.forRoot('mongodb+srv://root:root@restapi.xfamp.mongodb.net/megaStore?retryWrites=true&w=majority'), ProductsModule, BrandsModule, CategoriesModule, AuthModule, UsersModule, OrdersModule, AdminsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
