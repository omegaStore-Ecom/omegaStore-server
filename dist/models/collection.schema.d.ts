import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Seller } from './seller.schema';
export declare type CollectionDocument = Collection & Document;
export declare class Collection {
    collectionName: string;
    collectionDescription: string;
    collectionStatus: string;
    collectionOwner: Seller;
    collectionImage: string;
    createdAt: string;
}
export declare const CollectionSchema: mongoose.Schema<mongoose.Document<Collection, any, any>, mongoose.Model<mongoose.Document<Collection, any, any>, any, any>, undefined, {}>;
