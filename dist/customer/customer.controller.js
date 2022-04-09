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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const role_guard_1 = require("../role/role.guard");
const payload_1 = require("../types/payload");
const jsonwebtoken_1 = require("jsonwebtoken");
const customer_service_1 = require("./customer.service");
const users_1 = require("../types/users");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async register(registerDTO) {
        const Customer = await this.customerService.create(registerDTO);
        const payload = {
            email: Customer.email,
            role: Customer.role,
        };
        const token = await this.signPayload(payload);
        return { Customer, token };
    }
    async login(loginDTO) {
        const Customer = await this.customerService.findByLogin(loginDTO);
        const payload = {
            email: Customer.email,
            role: Customer.role,
        };
        const token = await this.signPayload(payload);
        return { Customer, token };
    }
    async signPayload(payload) {
        return jsonwebtoken_1.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
    }
    async update(res, id, updateDTO) {
        return this.customerService.update(id, updateDTO, res);
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "login", null);
__decorate([
    common_1.Put(':id'),
    role_guard_1.Roles('customer'),
    common_1.UseGuards(role_guard_1.RolesGuard),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "update", null);
CustomerController = __decorate([
    common_1.Controller('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map