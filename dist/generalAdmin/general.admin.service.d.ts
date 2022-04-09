import { Model } from 'mongoose';
import { Admin } from 'src/types/users';
import { RegisterDTO } from './register.dto';
import { Payload } from 'src/types/payload';
import { LoginDTO } from './login.dto';
export declare class GeneralAdminService {
    private GeneralAdminModel;
    constructor(GeneralAdminModel: Model<Admin>);
    create(RegisterDTO: RegisterDTO): Promise<Pick<import("mongoose")._LeanDocument<Admin>, "_id" | "__v" | "id" | "email" | "role" | "password">>;
    findByPayload(payload: Payload): Promise<Admin>;
    findByLogin(AdminDTO: LoginDTO): Promise<Pick<import("mongoose")._LeanDocument<Admin>, "_id" | "__v" | "id" | "email" | "role" | "password">>;
    sanitizeAdmin(GAdmin: Admin): Pick<import("mongoose")._LeanDocument<Admin>, "_id" | "__v" | "id" | "email" | "role" | "password">;
    validateAdmin(payload: Payload): Promise<Admin>;
}
