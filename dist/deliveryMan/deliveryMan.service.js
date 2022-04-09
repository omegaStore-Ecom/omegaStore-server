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
exports.DeliveryMenService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const payload_1 = require("../types/payload");
const users_1 = require("../types/users");
let DeliveryMenService = class DeliveryMenService {
    constructor(DeliveryMenModel) {
        this.DeliveryMenModel = DeliveryMenModel;
    }
    async create(DeliveryMan) {
        const { email } = DeliveryMan;
        const Admin = await this.DeliveryMenModel.findOne({ email });
        if (Admin) {
            throw new common_1.HttpException('deliveryMan already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdDeliveryMan = new this.DeliveryMenModel(DeliveryMan);
        createdDeliveryMan.password = Math.random()
            .toString(36)
            .substring(2, 15);
        await createdDeliveryMan.save();
        return this.sanitizeAdmin(createdDeliveryMan);
    }
    async findAll() {
        return await this.DeliveryMenModel.find();
    }
    async findOne(id) {
        return await this.DeliveryMenModel.findById(id);
    }
    async update(id, deliveryMan, res) {
        try {
            const updatedDeliveryMan = await this.DeliveryMenModel.findByIdAndUpdate(id, deliveryMan, { new: true });
            return res.status(common_1.HttpStatus.OK).json({
                updatedDeliveryMan,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async disableDeliveryMan(id, res) {
        try {
            const updatedDeliveryMan = await this.DeliveryMenModel.findOneAndUpdate(id, {
                $set: {
                    firstName: 'disabled',
                },
            });
            return res.status(common_1.HttpStatus.OK).json({
                updatedDeliveryMan,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async deleteDeliveryMan(id, res) {
        try {
            const deletedDeliveryMan = await this.DeliveryMenModel.findByIdAndRemove(id);
            return res.status(common_1.HttpStatus.OK).json({
                deletedDeliveryMan,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async findByPayload(payload) {
        const { email } = payload;
        return await this.DeliveryMenModel.findOne({ email });
    }
    async findByLogin(deliveryMan) {
        const { email, password } = deliveryMan;
        const existDeliveryMan = await this.DeliveryMenModel.findOne({ email });
        if (!existDeliveryMan) {
            throw new common_1.HttpException('DeliveryMan doesnt exists', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((await bcrypt.compare(password, existDeliveryMan.password)) &&
            existDeliveryMan.role === 'DeliveryMan') {
            return this.sanitizeAdmin(existDeliveryMan);
        }
        else {
            throw new common_1.HttpException('invalid credential', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    sanitizeAdmin(existDeliveryMan) {
        const sanitized = existDeliveryMan.toObject();
        delete sanitized['password'];
        return sanitized;
    }
    async validateAdmin(payload) {
        return await this.findByPayload(payload);
    }
};
DeliveryMenService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('DeliveryMan')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DeliveryMenService);
exports.DeliveryMenService = DeliveryMenService;
//# sourceMappingURL=deliveryMan.service.js.map