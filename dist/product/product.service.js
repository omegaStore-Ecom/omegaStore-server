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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_1 = require("../types/product");
const sellerservice_1 = require("./../seller/sellerservice");
let ProductService = class ProductService {
    constructor(ProductModule, sellerService) {
        this.ProductModule = ProductModule;
        this.sellerService = sellerService;
    }
    async createProduct(product, res, images, user) {
        try {
            const createdProduct = new this.ProductModule(product);
            createdProduct.productImage = images.map(image => image.filename);
            createdProduct.productSeller = user.id;
            await createdProduct.save();
            await this.sellerService.updateProductLimit(user.id, res, 1);
            return res.status(201).json({
                message: 'Product has been successfully created ',
                product: createdProduct,
                currentUser: user.productLimit
            });
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    }
    async findAll(res) {
        try {
            const products = await this.ProductModule.find();
            return res.status(200).json(products);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async findOne(id, res) {
        try {
            const product = await this.ProductModule.findById(id);
            if (!product) {
                res.status(404).json({
                    message: 'Product not found',
                });
            }
            return res.status(200).json({
                product,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async updateProduct(id, product, res) {
        try {
            const updatedProduct = await this.ProductModule.findByIdAndUpdate(id, product, { new: true });
            return res.status(200).json({
                message: 'Product has been successfully updated',
                product: updatedProduct,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async updateProductImage(id, images, res) {
        try {
            const updatedProduct = await this.ProductModule.findByIdAndUpdate(id, {
                $set: {
                    productImage: images.map(image => image.filename),
                },
            }, { new: true });
            return res.status(200).json({
                message: 'Product has been successfully updated',
                product: updatedProduct,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async deleteProduct(id, res, user) {
        try {
            const deletedProduct = await this.ProductModule.findByIdAndDelete(id);
            await this.sellerService.updateProductLimit(user.id, res, -1);
            return res.status(200).json({
                message: 'Product has been successfully deleted',
                product: deletedProduct,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        sellerservice_1.SellerService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map