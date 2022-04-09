import { VerifiedCallback } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { GeneralAdminService } from './general.admin.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private generalAdminService;
    constructor(generalAdminService: GeneralAdminService);
    validate(payload: any, done: VerifiedCallback): Promise<void>;
}
export {};
