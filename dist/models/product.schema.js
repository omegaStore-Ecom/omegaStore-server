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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const seller_schema_1 = require("./seller.schema");
let Product = class Product {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "productDescription", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "productQuantity", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "productPrice", void 0);
__decorate([
    mongoose_1.Prop({ default: 'Available' }),
    __metadata("design:type", String)
], Product.prototype, "productStatus", void 0);
__decorate([
    mongoose_1.Prop({ default: Date.now }),
    __metadata("design:type", Date)
], Product.prototype, "productCreatedAt", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Array)
], Product.prototype, "productImage", void 0);
__decorate([
    mongoose_1.Prop({ require: true }),
    __metadata("design:type", String)
], Product.prototype, "productCategory", void 0);
__decorate([
    mongoose_1.Prop({ require: true }),
    __metadata("design:type", String)
], Product.prototype, "productBrand", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Seller' }),
    __metadata("design:type", seller_schema_1.Seller)
], Product.prototype, "productSeller", void 0);
__decorate([
    mongoose_1.Prop({}),
    __metadata("design:type", String)
], Product.prototype, "productCollection", void 0);
Product = __decorate([
    mongoose_1.Schema()
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
//# sourceMappingURL=product.schema.js.map