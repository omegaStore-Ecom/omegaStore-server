import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Seller } from './seller.schema';
import { Collection } from './collection.schema';

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
  productImage: string;

  @Prop({ require: true })
  productCategory: string;

  @Prop({ require: true })
  productBrand: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Seller' })
  productSeller: Seller;

  @Prop({})
  productCollection: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
