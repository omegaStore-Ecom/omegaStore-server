/// <reference types="mongoose" />
import { AdminService } from './admin.service';
import { RegisterDTO } from './register.dto';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    register(registerDTO: RegisterDTO): Promise<{
        Admin: Pick<import("mongoose")._LeanDocument<import("../types/users").Admin>, "role" | "email" | "password" | "_id" | "__v" | "id">;
        token: string;
    }>;
    login(loginDTO: LoginDTO): Promise<{
        Admin: Pick<import("mongoose")._LeanDocument<import("../types/users").Admin>, "role" | "email" | "password" | "_id" | "__v" | "id">;
        token: string;
    }>;
    signPayload(payload: Payload): Promise<string>;
}
