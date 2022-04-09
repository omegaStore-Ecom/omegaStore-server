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
exports.DeliveryManController = void 0;
const common_1 = require("@nestjs/common");
const role_guard_1 = require("../role/role.guard");
const payload_1 = require("../types/payload");
const jsonwebtoken_1 = require("jsonwebtoken");
const deliveryMan_service_1 = require("./deliveryMan.service");
const users_1 = require("../types/users");
let DeliveryManController = class DeliveryManController {
    constructor(deliverymenService) {
        this.deliverymenService = deliverymenService;
    }
    async register(registerDTO) {
        const deliveryMan = await this.deliverymenService.create(registerDTO);
        const payload = {
            email: deliveryMan.email,
            role: deliveryMan.role,
        };
        const token = await this.signPayload(payload);
        return { deliveryMan, token };
    }
    async login(loginDTO) {
        const GAdmin = await this.deliverymenService.findByLogin(loginDTO);
        const payload = {
            email: GAdmin.email,
            role: GAdmin.role,
        };
        const token = await this.signPayload(payload);
        return { GAdmin, token };
    }
    async signPayload(payload) {
        return jsonwebtoken_1.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
    }
    async getALLDeliveryMen(res) {
        const deliverymen = await this.deliverymenService.findAll();
        res.status(200).json(deliverymen);
    }
    async getDeliveryMeById(res, id) {
        const deliverymen = await this.deliverymenService.findOne(id);
        res.status(200).json(deliverymen);
    }
    async updateDeliveryMan(deliveryMan, res, id) {
        return this.deliverymenService.update(id, deliveryMan, res);
    }
    async disableDeliveryMan(res, id) {
        return this.deliverymenService.disableDeliveryMan(id, res);
    }
    async DeleteDeliveryMan(res, id) {
        return this.deliverymenService.deleteDeliveryMan(id, res);
    }
};
__decorate([
    common_1.Post('register'),
    role_guard_1.Roles('admin'),
    common_1.UseGuards(role_guard_1.RolesGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeliveryManController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeliveryManController.prototype, "login", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeliveryManController.prototype, "getALLDeliveryMen", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryManController.prototype, "getDeliveryMeById", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryManController.prototype, "updateDeliveryMan", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryManController.prototype, "disableDeliveryMan", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryManController.prototype, "DeleteDeliveryMan", null);
DeliveryManController = __decorate([
    common_1.Controller('deliveryMan'),
    __metadata("design:paramtypes", [deliveryMan_service_1.DeliveryMenService])
], DeliveryManController);
exports.DeliveryManController = DeliveryManController;
//# sourceMappingURL=deliveryMan.controller.js.map