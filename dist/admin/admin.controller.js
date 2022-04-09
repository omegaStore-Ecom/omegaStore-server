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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const Admin_service_1 = require("./Admin.service");
const role_guard_1 = require("./../role/role.guard");
const payload_1 = require("../types/payload");
const jsonwebtoken_1 = require("jsonwebtoken");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async register(registerDTO) {
        const Admin = await this.adminService.create(registerDTO);
        const payload = {
            email: Admin.email,
            role: Admin.role,
        };
        const token = await this.signPayload(payload);
        return { Admin, token };
    }
    async login(loginDTO) {
        const Admin = await this.adminService.findByLogin(loginDTO);
        const payload = {
            email: Admin.email,
            role: Admin.role,
        };
        const token = await this.signPayload(payload);
        return { Admin, token };
    }
    async signPayload(payload) {
        return jsonwebtoken_1.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
    }
};
__decorate([
    common_1.Post('register'),
    role_guard_1.Roles('GAdmin'),
    common_1.UseGuards(role_guard_1.RolesGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
AdminController = __decorate([
    common_1.Controller('admin'),
    __metadata("design:paramtypes", [Admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map