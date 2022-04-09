import { Strategy } from 'passport-jwt';
import { CustomerService } from './customer.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private deliveryManService;
    constructor(deliveryManService: CustomerService);
    validate(payload: any): any;
}
export {};
