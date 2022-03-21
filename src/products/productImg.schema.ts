import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductImgDocument = ProductImg & Document;

@Schema()
export class ProductImg {
  @Prop()
  path: string;
}

export const ProductImgSchema = SchemaFactory.createForClass(ProductImg);
