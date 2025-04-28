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
exports.UserConfiguresController = void 0;
const common_1 = require("@nestjs/common");
const user_auth_guard_1 = require("../../guards/user-auth.guard");
const user_configures_service_1 = require("./user-configures.service");
const update_user_configure_dto_1 = require("./dto/update-user-configure.dto");
const user_decorator_1 = require("../../decorators/user.decorator");
let UserConfiguresController = class UserConfiguresController {
    userConfiguresService;
    constructor(userConfiguresService) {
        this.userConfiguresService = userConfiguresService;
    }
    findOne(user) {
        return this.userConfiguresService.findOrCreate(user.uid);
    }
    update(user, updateUserConfigureDto) {
        return this.userConfiguresService.update(user.uid, updateUserConfigureDto);
    }
};
exports.UserConfiguresController = UserConfiguresController;
__decorate([
    (0, common_1.Post)('get'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserConfiguresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_configure_dto_1.UpdateUserConfigureDto]),
    __metadata("design:returntype", void 0)
], UserConfiguresController.prototype, "update", null);
exports.UserConfiguresController = UserConfiguresController = __decorate([
    (0, common_1.Controller)('user-configure'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __metadata("design:paramtypes", [user_configures_service_1.UserConfiguresService])
], UserConfiguresController);
//# sourceMappingURL=user-configures.controller.js.map