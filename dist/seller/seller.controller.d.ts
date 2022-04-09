/// <reference types="mongoose" />
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
import { SellerService } from './sellerservice';
import { Seller } from 'src/types/users';
export declare class SellerController {
    private readonly sellerService;
    constructor(sellerService: SellerService);
    register(res: any, registerDTO: Seller, file: any): Promise<{
        Seller: any;
        token: string;
    }>;
    login(loginDTO: LoginDTO): Promise<{
        Seller: Pick<import("mongoose")._LeanDocument<Seller>, "file" | "_id" | "__v" | "id" | "email" | "role" | "password" | "type" | "firstName" | "lastName" | "phone" | "status" | "address" | "city" | "state" | "zip" | "country" | "generatedIncome" | "productLimit">;
        token: string;
    }>;
    signPayload(payload: Payload): Promise<string>;
    getALLSeller(res: any): Promise<any>;
    getSellerById(id: string): Promise<Seller>;
    updateSeller(seller: Seller, res: any, id: string): Promise<any>;
    disableSeller(res: any, id: string): Promise<any>;
}
