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
exports.CollectionController = void 0;
const common_1 = require("@nestjs/common");
const collection_service_1 = require("./collection.service");
const product_1 = require("../types/product");
const platform_express_1 = require("@nestjs/platform-express");
const file_uploading_utils_1 = require("../utils/file-uploading.utils");
const multer_1 = require("multer");
const role_guard_1 = require("../role/role.guard");
const users_1 = require("../types/users");
const sellerservice_1 = require("../seller/sellerservice");
let CollectionController = class CollectionController {
    constructor(collectionService, sellerService) {
        this.collectionService = collectionService;
        this.sellerService = sellerService;
    }
    async create(collection, res, images, user) {
        if (!user)
            return res
                .status(401)
                .json({ message: 'You must be logged in to create a collection' });
        const currentUser = await this.sellerService.findOne(user.id);
        if (currentUser.status === 'notActivate')
            return res.status(401).json({ message: 'Your account is pending' });
        return this.collectionService.createCollection(collection, res, images, currentUser);
    }
    async findAll(res) {
        return await this.collectionService.findAll(res);
    }
    async findById(res, id) {
        try {
            const collection = await this.collectionService.findOne(id, res);
            return res.status(common_1.HttpStatus.OK).json({
                collection,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async update(res, id, collection) {
        return await this.collectionService.updateCollection(id, collection, res);
    }
    async updateImage(res, id, images) {
        return await this.collectionService.updateCollectionImage(id, images, res);
    }
    async delete(res, id) {
        return await this.collectionService.deleteCollection(id, res);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('collectionImage', {
        storage: multer_1.diskStorage({
            destination: './upload/collectionImg',
            filename: file_uploading_utils_1.editFileName,
        }),
        fileFilter: file_uploading_utils_1.imageFileFilter,
    })),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.UploadedFile()),
    __param(3, role_guard_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "findById", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "update", null);
__decorate([
    common_1.Put('/:id/image'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('collectionImage', {
        storage: multer_1.diskStorage({
            destination: './upload/productImg',
            filename: file_uploading_utils_1.editFileName,
        }),
        fileFilter: file_uploading_utils_1.imageFileFilter,
    })),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "updateImage", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "delete", null);
CollectionController = __decorate([
    common_1.Controller('collection'),
    __metadata("design:paramtypes", [collection_service_1.CollectionService,
        sellerservice_1.SellerService])
], CollectionController);
exports.CollectionController = CollectionController;
//# sourceMappingURL=collection.controller.js.map