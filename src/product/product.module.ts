import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/models/product.schema';
import { SellerModule } from 'src/seller/seller.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    SellerModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
