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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_1 = require("../types/product");
const platform_express_1 = require("@nestjs/platform-express");
const file_uploading_utils_1 = require("../utils/file-uploading.utils");
const multer_1 = require("multer");
const role_guard_1 = require("../role/role.guard");
const users_1 = require("../types/users");
const sellerservice_1 = require("../seller/sellerservice");
let ProductController = class ProductController {
    constructor(productService, sellerService) {
        this.productService = productService;
        this.sellerService = sellerService;
    }
    async create(product, res, images, user) {
        if (!user)
            return res.status(401).json({ message: 'You must be logged in to create a product' });
        const currentUser = await this.sellerService.findOne(user.id);
        if (currentUser.status === 'notActivate')
            return res.status(401).json({ message: 'Your account is pending' });
        if (currentUser.productLimit > 10 && currentUser.type === 'Starter')
            return res.status(401).json({ message: 'You have reached your product limit' });
        if (currentUser.productLimit > 50 && currentUser.type === 'Pro')
            return res.status(401).json({ message: 'You have reached your product limit' });
        return this.productService.createProduct(product, res, images, currentUser);
    }
    async findAll(res) {
        return await this.productService.findAll(res);
    }
    async findById(res, id) {
        try {
            const product = await this.productService.findOne(id, res);
            return res.status(common_1.HttpStatus.OK).json({
                product,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async update(res, id, product) {
        return await this.productService.updateProduct(id, product, res);
    }
    async updateImage(res, id, images) {
        return await this.productService.updateProductImage(id, images, res);
    }
    async delete(res, id, user) {
        return await this.productService.deleteProduct(id, res, user);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('productImage', 20, {
        storage: multer_1.diskStorage({
            destination: './upload/product',
            filename: file_uploading_utils_1.editFileName,
        }),
        fileFilter: file_uploading_utils_1.imageFileFilter,
    })),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.UploadedFiles()), __param(3, role_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findById", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    common_1.Put('/:id/image'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('productImage', 20, {
        storage: multer_1.diskStorage({
            destination: './upload/productImg',
            filename: file_uploading_utils_1.editFileName,
        }),
        fileFilter: file_uploading_utils_1.imageFileFilter,
    })),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateImage", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')), __param(2, role_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
ProductController = __decorate([
    common_1.Controller('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService, sellerservice_1.SellerService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map