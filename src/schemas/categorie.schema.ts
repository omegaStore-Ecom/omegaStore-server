import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategorieDocument = Categorie & Document;

@Schema()
export class Categorie {
  @Prop()
  name: string;  
}

export const CategorieSchema = SchemaFactory.createForClass(Categorie);