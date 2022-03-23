import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SellerDocument = Seller & Document;

@Schema()
export class Seller {
  @Prop()
  sellerFirstName: string;

  @Prop()
  sellerLastName: string;

  @Prop()
  sellerEmail: string;

  @Prop()
  sellerPassword: string;

  @Prop()
  sellerRole: string;

  @Prop()
  sellerType: string;

  @Prop({ required: true })
  sellerFile: string;

  @Prop({ type: Boolean, default: 'true' })
  sellerStatus: string;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
