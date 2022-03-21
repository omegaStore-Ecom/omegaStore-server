import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SellerAuthDocument = SellerAuth & Document;

@Schema()
export class SellerAuth {
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

  @Prop({ type: Boolean, default: 'true' })
  sellerAuthStatus: string;
}

export const SellerAuthSchema = SchemaFactory.createForClass(SellerAuth);
