import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  second_address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zip: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  createdAt: Date;

  @Prop([String])
  command: [string];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
