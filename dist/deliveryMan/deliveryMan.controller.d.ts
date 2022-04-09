/// <reference types="mongoose" />
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
import { DeliveryMenService } from './deliveryMan.service';
import { DeliveryMan } from 'src/types/users';
export declare class DeliveryManController {
    private readonly deliverymenService;
    constructor(deliverymenService: DeliveryMenService);
    register(registerDTO: DeliveryMan): Promise<{
        deliveryMan: Pick<import("mongoose")._LeanDocument<DeliveryMan>, "_id" | "__v" | "id" | "email" | "role" | "password" | "type" | "firstName" | "lastName" | "phone" | "status">;
        token: string;
    }>;
    login(loginDTO: LoginDTO): Promise<{
        GAdmin: Pick<import("mongoose")._LeanDocument<DeliveryMan>, "_id" | "__v" | "id" | "email" | "role" | "password" | "type" | "firstName" | "lastName" | "phone" | "status">;
        token: string;
    }>;
    signPayload(payload: Payload): Promise<string>;
    getALLDeliveryMen(res: any): Promise<void>;
    getDeliveryMeById(res: any, id: string): Promise<void>;
    updateDeliveryMan(deliveryMan: DeliveryMan, res: any, id: string): Promise<any>;
    disableDeliveryMan(res: any, id: string): Promise<any>;
    DeleteDeliveryMan(res: any, id: string): Promise<any>;
}
