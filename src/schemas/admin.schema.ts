import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop()
  fName: string;

  @Prop()
  lName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone : number;


  @Prop({default: 'admin'})
  role: string;
  
}

export const AdminSchema = SchemaFactory.createForClass(Admin);