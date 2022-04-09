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
exports.GeneralAdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_1 = require("../types/users");
const bcrypt = require("bcrypt");
const payload_1 = require("../types/payload");
let GeneralAdminService = class GeneralAdminService {
    constructor(GeneralAdminModel) {
        this.GeneralAdminModel = GeneralAdminModel;
    }
    async create(RegisterDTO) {
        const { email } = RegisterDTO;
        const Admin = await this.GeneralAdminModel.findOne({ email });
        if (Admin) {
            throw new common_1.HttpException('General Admin already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdGAdmin = new this.GeneralAdminModel(RegisterDTO);
        await createdGAdmin.save();
        return this.sanitizeAdmin(createdGAdmin);
    }
    async findByPayload(payload) {
        const { email } = payload;
        return await this.GeneralAdminModel.findOne({ email });
    }
    async findByLogin(AdminDTO) {
        const { email, password } = AdminDTO;
        const GAdmin = await this.GeneralAdminModel.findOne({ email });
        if (!GAdmin) {
            throw new common_1.HttpException('General Admin doesnt exists', common_1.HttpStatus.BAD_REQUEST);
        }
        if ((await bcrypt.compare(password, GAdmin.password)) &&
            GAdmin.role === 'GAdmin') {
            return this.sanitizeAdmin(GAdmin);
        }
        else {
            throw new common_1.HttpException('invalid credential', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    sanitizeAdmin(GAdmin) {
        const sanitized = GAdmin.toObject();
        delete sanitized['password'];
        return sanitized;
    }
    async validateAdmin(payload) {
        return await this.findByPayload(payload);
    }
};
GeneralAdminService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('GeneralAdmin')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GeneralAdminService);
exports.GeneralAdminService = GeneralAdminService;
//# sourceMappingURL=general.admin.service.js.map