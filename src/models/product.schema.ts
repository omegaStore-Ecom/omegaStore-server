import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from './category.schema';
import { Brand } from './brand.schema';
import { Seller } from './seller.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  productDescription: string;

  @Prop({ required: true })
  productQuantity: number;

  @Prop({ required: true })
  productPrice: number;

  @Prop({ default: 'Available' })
  productStatus: string;

  @Prop({ default: Date.now })
  productCreatedAt: Date;

  @Prop({ required: true })
  productImage: [string];

  @Prop({ type: Types.ObjectId, ref: Category.name })
  productCategory?: Category;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  productBrand: Brand;

  @Prop({ type: Types.ObjectId, ref: Seller.name })
  productSeller: Seller;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
