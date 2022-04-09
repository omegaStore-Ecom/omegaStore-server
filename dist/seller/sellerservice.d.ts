import { Model } from 'mongoose';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
import { Seller } from 'src/types/users';
export declare class SellerService {
    private SellerModel;
    constructor(SellerModel: Model<Seller>);
    create(Seller: Seller, file: any, res: any): Promise<any>;
    findAll(res: any): Promise<any>;
    findOne(id: any): Promise<Seller>;
    update(id: any, seller: any, res: any): Promise<any>;
    updateProductLimit(id: any, res: any, inc: any): Promise<Seller>;
    disableSeller(id: any, res: any): Promise<any>;
    findByPayload(payload: Payload): Promise<Seller>;
    findByLogin(seller: LoginDTO): Promise<Pick<import("mongoose")._LeanDocument<Seller>, "file" | "_id" | "__v" | "id" | "email" | "role" | "password" | "type" | "firstName" | "lastName" | "phone" | "status" | "address" | "city" | "state" | "zip" | "country" | "generatedIncome" | "productLimit">>;
    sanitizeAdmin(existSeller: Seller): Pick<import("mongoose")._LeanDocument<Seller>, "file" | "_id" | "__v" | "id" | "email" | "role" | "password" | "type" | "firstName" | "lastName" | "phone" | "status" | "address" | "city" | "state" | "zip" | "country" | "generatedIncome" | "productLimit">;
    validateAdmin(payload: Payload): Promise<Seller>;
}
