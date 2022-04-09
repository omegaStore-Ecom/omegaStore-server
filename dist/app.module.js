"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_module_1 = require("@nestjs/mongoose/dist/mongoose.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const Admin_module_1 = require("./admin/Admin.module");
const config_1 = require("@nestjs/config");
const general_admin_module_1 = require("./generalAdmin/general.admin.module");
const deliveryMan_module_1 = require("./deliveryMan/deliveryMan.module");
const core_1 = require("@nestjs/core");
const role_guard_1 = require("./role/role.guard");
const customer_module_1 = require("./customer/customer.module");
const seller_module_1 = require("./seller/seller.module");
const platform_express_1 = require("@nestjs/platform-express");
const product_module_1 = require("./product/product.module");
const collection_module_1 = require("./collections/collection.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_module_1.MongooseModule.forRoot(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }),
            platform_express_1.MulterModule.registerAsync({
                useFactory: () => ({
                    dest: './products/upload',
                }),
            }),
            Admin_module_1.AdminModule,
            general_admin_module_1.GeneralAdminModule,
            deliveryMan_module_1.DeliveryMenModule,
            customer_module_1.CustomerModule,
            seller_module_1.SellerModule,
            product_module_1.ProductModule,
            collection_module_1.CollectionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map