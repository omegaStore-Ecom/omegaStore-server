import { Module } from '@nestjs/common';
import { DeliverymenService } from './deliverymen.service';
import { DeliverymenController } from './deliverymen.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Deliverymen, DeliverymenSchema } from 'src/schemas/deliverymen.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Deliverymen.name, schema: DeliverymenSchema },
    ]),
  ],
  controllers: [DeliverymenController],
  providers: [DeliverymenService],
})
export class DeliverymenModule {}
