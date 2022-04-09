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
exports.SellerController = void 0;
const common_1 = require("@nestjs/common");
const payload_1 = require("../types/payload");
const jsonwebtoken_1 = require("jsonwebtoken");
const sellerservice_1 = require("./sellerservice");
const users_1 = require("../types/users");
const platform_express_1 = require("@nestjs/platform-express");
const file_uploading_utils_1 = require("../utils/file-uploading.utils");
const multer_1 = require("multer");
let SellerController = class SellerController {
    constructor(sellerService) {
        this.sellerService = sellerService;
    }
    async register(res, registerDTO, file) {
        const Seller = await this.sellerService.create(registerDTO, file, res);
        const payload = {
            id: Seller._id,
            email: Seller.email,
            role: Seller.role,
            type: Seller.type,
            productLimit: Seller.productLimit,
            status: Seller.status,
            generatedIncome: Seller.generatedIncome,
        };
        const token = await this.signPayload(payload);
        return { Seller, token };
    }
    async login(loginDTO) {
        const Seller = await this.sellerService.findByLogin(loginDTO);
        const payload = {
            id: Seller._id,
            email: Seller.email,
            role: Seller.role,
            type: Seller.type,
            productLimit: Seller.productLimit,
            status: Seller.status,
            generatedIncome: Seller.generatedIncome,
        };
        const token = await this.signPayload(payload);
        return { Seller, token };
    }
    async signPayload(payload) {
        return jsonwebtoken_1.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
    }
    async getALLSeller(res) {
        return this.sellerService.findAll(res);
    }
    async getSellerById(id) {
        return this.sellerService.findOne(id);
    }
    async updateSeller(seller, res, id) {
        return this.sellerService.update(id, seller, res);
    }
    async disableSeller(res, id) {
        return this.sellerService.disableSeller(id, res);
    }
};
__decorate([
    common_1.Post('register'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('file', 1, {
        storage: multer_1.diskStorage({
            destination: './upload/seller',
            filename: file_uploading_utils_1.editFileName,
        }),
        fileFilter: file_uploading_utils_1.fileFilter,
    })),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "login", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getALLSeller", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerById", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "updateSeller", null);
__decorate([
    common_1.Put('disable/:id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "disableSeller", null);
SellerController = __decorate([
    common_1.Controller('seller'),
    __metadata("design:paramtypes", [sellerservice_1.SellerService])
], SellerController);
exports.SellerController = SellerController;
//# sourceMappingURL=seller.controller.js.map