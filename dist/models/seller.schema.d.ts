import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare type SellerDocument = Seller & Document;
export declare class Seller {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    generatedIncome: string;
    productLimit: string;
    role: string;
    type: string;
    file: string;
    createdAt: Date;
    status: boolean;
}
export declare const SellerSchema: mongoose.Schema<mongoose.Document<Seller, any, any>, mongoose.Model<mongoose.Document<Seller, any, any>, any, any>, undefined, {}>;
