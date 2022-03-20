import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  productPrice: number;

  @Prop({ required: true })
  productDescription: string;

  @Prop({ required: true })
  productQuantity: number;

  @Prop({ required: true })
  productCategory: string;

  @Prop({ required: true })
  productImage: [string];

  @Prop({ type: Boolean, default: true })
  productStatus?: string;

  @Prop()
  productBrand: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
