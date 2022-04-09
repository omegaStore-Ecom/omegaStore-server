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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_1 = require("../types/users");
const bcrypt = require("bcrypt");
const payload_1 = require("../types/payload");
let CustomerService = class CustomerService {
    constructor(CustomerModel) {
        this.CustomerModel = CustomerModel;
    }
    async create(customer) {
        const { email } = customer;
        const Customer = await this.CustomerModel.findOne({ email });
        if (Customer) {
            throw new common_1.HttpException('customer already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdCustomer = new this.CustomerModel(customer);
        await createdCustomer.save();
        return this.sanitizeAdmin(createdCustomer);
    }
    async findAll(res) {
        try {
            const deliverymen = await this.CustomerModel.find();
            return res.status(common_1.HttpStatus.OK).json({
                deliverymen,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async update(id, deliveryMan, res) {
        try {
            const updatedCustomer = await this.CustomerModel.findByIdAndUpdate(id, deliveryMan, { new: true });
            return res.status(common_1.HttpStatus.OK).json({
                updatedCustomer,
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async findByPayload(payload) {
        const { email } = payload;
        return await this.CustomerModel.findOne({ email });
    }
    async findByLogin(deliveryMan) {
        const { email, password } = deliveryMan;
        const existCustomer = await this.CustomerModel.findOne({ email });
        if (!existCustomer) {
            throw new common_1.HttpException('customer doesnt exists', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((await bcrypt.compare(password, existCustomer.password)) &&
            existCustomer.role === 'customer') {
            return this.sanitizeAdmin(existCustomer);
        }
        else {
            throw new common_1.HttpException('invalid credential', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    sanitizeAdmin(existCustomer) {
        const sanitized = existCustomer.toObject();
        delete sanitized['password'];
        return sanitized;
    }
};
CustomerService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Customer')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map