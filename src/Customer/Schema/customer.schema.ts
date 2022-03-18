/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  role: string;

  @Prop()
  phone: number;

  @Prop()
  password: string;

  @Prop()
  Country: string;

  @Prop()
  address: string;

  @Prop()
  second_address: string;

  @Prop()
  city: string;

  @Prop()
  postal_code: string;

  @Prop([String])
  command: [string];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
