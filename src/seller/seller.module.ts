import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerService } from './sellerservice';
import { SellerController } from './seller.controller';
import { SellerSchema } from 'src/models/seller.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
  ],
  providers: [SellerService],
  controllers: [SellerController],
})
export class SellerModule {}
