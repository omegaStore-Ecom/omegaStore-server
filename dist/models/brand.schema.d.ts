import { Document } from 'mongoose';
export declare type BrandDocument = Brand & Document;
export declare class Brand {
    name: string;
    status: boolean;
}
export declare const BrandSchema: import("mongoose").Schema<Document<Brand, any, any>, import("mongoose").Model<Document<Brand, any, any>, any, any>, undefined, {}>;
