import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BrandDocument = Brand & Document;

@Schema()
export class Brand {
  @Prop()
  name: string;

  @Prop()
  status: boolean;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
