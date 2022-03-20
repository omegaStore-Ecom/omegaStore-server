import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop([{ type: String, required: true }])
  image: [string];

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
