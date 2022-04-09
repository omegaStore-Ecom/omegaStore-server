import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Seller } from './seller.schema';
export declare type ProductDocument = Product & Document;
export declare class Product {
    productName: string;
    productDescription: string;
    productQuantity: number;
    productPrice: number;
    productStatus: string;
    productCreatedAt: Date;
    productImage: [string];
    productCategory: string;
    productBrand: string;
    productSeller: Seller;
    productCollection: string;
}
export declare const ProductSchema: mongoose.Schema<mongoose.Document<Product, any, any>, mongoose.Model<mongoose.Document<Product, any, any>, any, any>, undefined, {}>;
