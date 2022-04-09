/// <reference types="mongoose" />
import { GeneralAdminService } from './general.admin.service';
import { RegisterDTO } from './register.dto';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
export declare class GeneralAdminController {
    private readonly generalAdminService;
    constructor(generalAdminService: GeneralAdminService);
    register(registerDTO: RegisterDTO): Promise<{
        GAdmin: Pick<import("mongoose")._LeanDocument<import("../types/users").Admin>, "_id" | "__v" | "id" | "email" | "role" | "password">;
        token: string;
    }>;
    login(loginDTO: LoginDTO): Promise<{
        GAdmin: Pick<import("mongoose")._LeanDocument<import("../types/users").Admin>, "_id" | "__v" | "id" | "email" | "role" | "password">;
        token: string;
    }>;
    signPayload(payload: Payload): Promise<string>;
}
