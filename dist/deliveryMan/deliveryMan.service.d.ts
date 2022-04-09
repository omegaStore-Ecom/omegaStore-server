import { Model } from 'mongoose';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
import { DeliveryMan } from 'src/types/users';
export declare class DeliveryMenService {
    private DeliveryMenModel;
    constructor(DeliveryMenModel: Model<DeliveryMan>);
    create(DeliveryMan: DeliveryMan): Promise<Pick<import("mongoose")._LeanDocument<DeliveryMan>, "_id" | "__v" | "id" | "email" | "role" | "password" | "type" | "firstName" | "lastName" | "phone" | "status">>;
    findAll(): Promise<DeliveryMan[]>;
    findOne(id: any): Promise<DeliveryMan>;
    update(id: any, deliveryMan: any, res: any): Promise<any>;
    disableDeliveryMan(id: any, res: any): Promise<any>;
    deleteDeliveryMan(id: any, res: any): Promise<any>;
    findByPayload(payload: Payload): Promise<DeliveryMan>;
    findByLogin(deliveryMan: LoginDTO): Promise<Pick<import("mongoose")._LeanDocument<DeliveryMan>, "_id" | "__v" | "id" | "email" | "role" | "password" | "type" | "firstName" | "lastName" | "phone" | "status">>;
    sanitizeAdmin(existDeliveryMan: DeliveryMan): Pick<import("mongoose")._LeanDocument<DeliveryMan>, "_id" | "__v" | "id" | "email" | "role" | "password" | "type" | "firstName" | "lastName" | "phone" | "status">;
    validateAdmin(payload: Payload): Promise<DeliveryMan>;
}
