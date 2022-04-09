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
exports.SellerSchema = exports.Seller = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
let Seller = class Seller {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Seller.prototype, "firstName", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Seller.prototype, "lastName", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Seller.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Seller.prototype, "password", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Seller.prototype, "phone", void 0);
__decorate([
    mongoose_1.Prop({ type: Number, default: 0 }),
    __metadata("design:type", String)
], Seller.prototype, "generatedIncome", void 0);
__decorate([
    mongoose_1.Prop({ type: Number, default: 0 }),
    __metadata("design:type", String)
], Seller.prototype, "productLimit", void 0);
__decorate([
    mongoose_1.Prop({ type: String, default: 'seller' }),
    __metadata("design:type", String)
], Seller.prototype, "role", void 0);
__decorate([
    mongoose_1.Prop({ type: String, default: 'Starter' }),
    __metadata("design:type", String)
], Seller.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Seller.prototype, "file", void 0);
__decorate([
    mongoose_1.Prop({ default: Date.now }),
    __metadata("design:type", Date)
], Seller.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop({ default: false }),
    __metadata("design:type", Boolean)
], Seller.prototype, "status", void 0);
Seller = __decorate([
    mongoose_1.Schema()
], Seller);
exports.Seller = Seller;
exports.SellerSchema = mongoose_1.SchemaFactory.createForClass(Seller);
exports.SellerSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
//# sourceMappingURL=seller.schema.js.map