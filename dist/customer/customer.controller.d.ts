/// <reference types="mongoose" />
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
import { CustomerService } from './customer.service';
import { Customer } from 'src/types/users';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    register(registerDTO: Customer): Promise<{
        Customer: Pick<import("mongoose")._LeanDocument<Customer>, "_id" | "__v" | "id" | "email" | "role" | "password" | "firstName" | "lastName" | "phone">;
        token: string;
    }>;
    login(loginDTO: LoginDTO): Promise<{
        Customer: Pick<import("mongoose")._LeanDocument<Customer>, "_id" | "__v" | "id" | "email" | "role" | "password" | "firstName" | "lastName" | "phone">;
        token: string;
    }>;
    signPayload(payload: Payload): Promise<string>;
    update(res: any, id: string, updateDTO: Customer): Promise<any>;
}
