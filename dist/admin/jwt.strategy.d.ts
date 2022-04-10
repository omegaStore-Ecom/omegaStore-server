import { VerifiedCallback } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { AdminService } from 'src/admin/admin.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private adminService;
    constructor(adminService: AdminService);
    validate(payload: any, done: VerifiedCallback): Promise<void>;
}
export {};
