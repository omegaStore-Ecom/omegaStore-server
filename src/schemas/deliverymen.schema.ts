import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeliverymenDocument = Deliverymen & Document;

@Schema()
export class Deliverymen {
  @Prop()
  deliveryFirstName: string;

  @Prop()
  deliverymenLastName: string;

  @Prop()
  deliverymenType: string;

  @Prop()
  deliverymenEmail: string;

  @Prop()
  deliverymenPassword: string;
}

export const DeliverymenSchema = SchemaFactory.createForClass(Deliverymen);
