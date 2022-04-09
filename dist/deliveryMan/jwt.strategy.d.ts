import { Strategy } from 'passport-jwt';
import { DeliveryMenService } from './deliveryMan.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private deliveryManService;
    constructor(deliveryManService: DeliveryMenService);
    validate(payload: any): any;
}
export {};
