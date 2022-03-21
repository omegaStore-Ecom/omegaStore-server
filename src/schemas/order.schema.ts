import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Customer } from 'src/schemas/customer.schema';
import { Product } from 'src/schemas/product.schema';



export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  adress: string;

  @Prop({
    type: String,
    default: 'PENDING',
    enum: ['PENDING', 'CONFIRMED'],
  })
  status: String;

  @Prop({
    default: 0,
  })
  total: number;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: { quantity: number; product: Product }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer: Customer;

}

export const OrderSchema = SchemaFactory.createForClass(Order);