"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_1 = require("../types/users");
const bcrypt = require("bcrypt");
const payload_1 = require("../types/payload");
let AdminService = class AdminService {
    constructor(AdminModel) {
        this.AdminModel = AdminModel;
    }
    async create(RegisterDTO) {
        const { email } = RegisterDTO;
        const Admin = await this.AdminModel.findOne({ email });
        if (Admin) {
            throw new common_1.HttpException('Admin already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdAdmin = new this.AdminModel(RegisterDTO);
        await createdAdmin.save();
        return this.sanitizeAdmin(createdAdmin);
    }
    async findByPayload(payload) {
        const { email } = payload;
        return await this.AdminModel.findOne({ email });
    }
    async findByLogin(AdminDTO) {
        const { email, password } = AdminDTO;
        const Admin = await this.AdminModel.findOne({ email });
        if (!Admin) {
            throw new common_1.HttpException('Admin doesnt exists', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((await bcrypt.compare(password, Admin.password)) &&
            Admin.role === 'admin') {
            return this.sanitizeAdmin(Admin);
        }
        else {
            throw new common_1.HttpException('invalid credential', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    sanitizeAdmin(Admin) {
        const sanitized = Admin.toObject();
        delete sanitized['password'];
        return sanitized;
    }
    async validateAdmin(payload) {
        return await this.findByPayload(payload);
    }
};
AdminService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Admin')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=Admin.service.js.map