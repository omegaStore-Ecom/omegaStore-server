import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Seller } from './seller.schema';

export type CollectionDocument = Collection & Document;

@Schema()
export class Collection {
  @Prop({ required: true })
  collectionName: string;

  @Prop()
  collectionDescription: string;

  @Prop({ required: true, default: 'active' })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Seller' })
  collectionOwner: Seller;

  @Prop()
  collectionImage: string;

  @Prop({ type: Number, default: 0 })
  createdAt: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
