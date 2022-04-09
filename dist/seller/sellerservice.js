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
exports.SellerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const payload_1 = require("../types/payload");
const users_1 = require("../types/users");
let SellerService = class SellerService {
    constructor(SellerModel) {
        this.SellerModel = SellerModel;
    }
    async create(Seller, file, res) {
        var _a;
        const { email } = Seller;
        const existSeller = await this.SellerModel.findOne({ email });
        if (existSeller) {
            throw new common_1.HttpException('seller already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdSeller = new this.SellerModel(Seller);
        createdSeller.file = (_a = file[0]) === null || _a === void 0 ? void 0 : _a.filename;
        await createdSeller.save();
        return res.status(200).json(this.sanitizeAdmin(createdSeller));
    }
    async findAll(res) {
        try {
            const seller = await this.SellerModel.find();
            return res.status(common_1.HttpStatus.OK).json(seller);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async findOne(id) {
        return await this.SellerModel.findById(id);
    }
    async update(id, seller, res) {
        try {
            const updatedSeller = await this.SellerModel.findByIdAndUpdate(id, seller, { new: true });
            return res.status(common_1.HttpStatus.OK).json({
                updatedSeller,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async updateProductLimit(id, res, inc) {
        return this.SellerModel.findByIdAndUpdate(id, { $inc: { productLimit: inc } }, { new: true });
    }
    async disableSeller(id, res) {
        try {
            const seller = await this.findOne(id);
            const updatedSeller = await this.SellerModel.findOneAndUpdate(id, {
                $set: {
                    status: !seller.status,
                },
            });
            return res.status(common_1.HttpStatus.OK).json(updatedSeller);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async findByPayload(payload) {
        const { email } = payload;
        return this.SellerModel.findOne({ email });
    }
    async findByLogin(seller) {
        const { email, password } = seller;
        const existSeller = await this.SellerModel.findOne({ email });
        if (!existSeller) {
            throw new common_1.HttpException('Seller doesnt exists', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((await bcrypt.compare(password, existSeller.password)) &&
            existSeller.role === 'seller') {
            return this.sanitizeAdmin(existSeller);
        }
        else {
            throw new common_1.HttpException('invalid credential', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    sanitizeAdmin(existSeller) {
        const sanitized = existSeller.toObject();
        delete sanitized['password'];
        return sanitized;
    }
    async validateAdmin(payload) {
        return await this.findByPayload(payload);
    }
};
SellerService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Seller')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SellerService);
exports.SellerService = SellerService;
//# sourceMappingURL=sellerservice.js.map