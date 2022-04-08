import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type SellerDocument = Seller & Document;

@Schema()
export class Seller {
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

  @Prop({ type: Number, default: 0 })
  generatedIncome: string;

  @Prop({ type: Number, default: 0 })
  productLimit: string;

  @Prop({ type: String, default: 'seller' })
  role: string;

  @Prop({ type: String, default: 'Starter' })
  type: string;

  @Prop({ required: true })
  file: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({  default: false })
  status: boolean;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);

SellerSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
