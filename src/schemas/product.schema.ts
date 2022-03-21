import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from './category.schema';
import { Brand } from './brand.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  productName: string;

  @Prop()
  productDescription: string;

  @Prop()
  productQuantity: number;

  @Prop()
  productPrice: number;

  @Prop({ default: 'pending' })
  productStatus: string;

  @Prop({ required: true })
  productImage: [string];

  @Prop({ type: Types.ObjectId, ref: Category.name })
  productCategory?: Category;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  productBrand: Brand;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
