import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import { DeliveryMenService } from './deliveryMan.service';
import { DeliveryManController } from './deliveryMan.controller';
import { DeliveryMenSchema } from 'src/models/deliveryMan.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DeliveryMan', schema: DeliveryMenSchema },
    ]),
  ],
  providers: [DeliveryMenService, JwtStrategy],
  controllers: [DeliveryManController],
})
export class DeliveryMenModule {}
