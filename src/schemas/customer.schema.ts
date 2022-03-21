import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  username:string;

  @Prop()
  password: string;

  @Prop()
  country: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  phone : number;

  @Prop({
    default: false
  })
  @Prop()
  confirmation :boolean;

  @Prop({
    default: 'customer'

  })
  role: string;
  

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);