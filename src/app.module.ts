import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './products/product.schema';
import { ProductService } from './products/product.service';
import { ProductController } from './products/product.controller';
import { MulterModule } from '@nestjs/platform-express';

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
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
