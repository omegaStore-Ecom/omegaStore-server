import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionSchema } from 'src/models/collection.schema';
import { SellerModule } from 'src/seller/seller.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Collection', schema: CollectionSchema }]),
    SellerModule,
  ],
  providers: [CollectionService],
  controllers: [CollectionController],
})
export class CollectionModule {}
