import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
<<<<<<< Updated upstream
import { Seller, SellerSchema } from '../schemas/sellerAuth.schema';
import { MongooseModule } from '@nestjs/mongoose';
=======

import { MongooseModule } from '@nestjs/mongoose';
import { Seller, SellerSchema } from '../models/sellerAuth.schema';
>>>>>>> Stashed changes

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
  ],
  controllers: [SellersController],
  providers: [SellersService],
})
export class SellersModule {}
