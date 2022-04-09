/// <reference types="mongoose" />
import { AdminService } from './Admin.service';
import { RegisterDTO } from './register.dto';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    register(registerDTO: RegisterDTO): Promise<{
        Admin: Pick<import("mongoose")._LeanDocument<import("../types/users").Admin>, "_id" | "__v" | "id" | "email" | "role" | "password">;
        token: string;
    }>;
    login(loginDTO: LoginDTO): Promise<{
        Admin: Pick<import("mongoose")._LeanDocument<import("../types/users").Admin>, "_id" | "__v" | "id" | "email" | "role" | "password">;
        token: string;
    }>;
    signPayload(payload: Payload): Promise<string>;
}
