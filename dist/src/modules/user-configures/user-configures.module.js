"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConfiguresModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_configures_service_1 = require("./user-configures.service");
const user_configures_controller_1 = require("./user-configures.controller");
const user_configure_entity_1 = require("./entities/user-configure.entity");
let UserConfiguresModule = class UserConfiguresModule {
};
exports.UserConfiguresModule = UserConfiguresModule;
exports.UserConfiguresModule = UserConfiguresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_configure_entity_1.UserConfigure])],
        controllers: [user_configures_controller_1.UserConfiguresController],
        providers: [user_configures_service_1.UserConfiguresService],
        exports: [user_configures_service_1.UserConfiguresService],
    })
], UserConfiguresModule);
//# sourceMappingURL=user-configures.module.js.map