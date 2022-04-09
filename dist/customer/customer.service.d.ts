import { Model } from 'mongoose';
import { Customer } from 'src/types/users';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
export declare class CustomerService {
    private CustomerModel;
    constructor(CustomerModel: Model<Customer>);
    create(customer: Customer): Promise<Pick<import("mongoose")._LeanDocument<Customer>, "_id" | "__v" | "id" | "email" | "role" | "password" | "firstName" | "lastName" | "phone">>;
    findAll(res: any): Promise<any>;
    update(id: any, deliveryMan: any, res: any): Promise<any>;
    findByPayload(payload: Payload): Promise<Customer>;
    findByLogin(deliveryMan: LoginDTO): Promise<Pick<import("mongoose")._LeanDocument<Customer>, "_id" | "__v" | "id" | "email" | "role" | "password" | "firstName" | "lastName" | "phone">>;
    sanitizeAdmin(existCustomer: Customer): Pick<import("mongoose")._LeanDocument<Customer>, "_id" | "__v" | "id" | "email" | "role" | "password" | "firstName" | "lastName" | "phone">;
}
