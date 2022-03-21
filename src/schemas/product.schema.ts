import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Brand } from 'src/schemas/brand.schema';
import { Categorie } from 'src/schemas/categorie.schema';


export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: Brand;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' })
  categorie: Categorie;

}

export const ProductSchema = SchemaFactory.createForClass(Product);