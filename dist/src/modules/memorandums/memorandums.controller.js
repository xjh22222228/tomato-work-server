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
exports.MemorandumsController = void 0;
const common_1 = require("@nestjs/common");
const user_auth_guard_1 = require("../../guards/user-auth.guard");
const memorandums_service_1 = require("./memorandums.service");
const create_memorandum_dto_1 = require("./dto/create-memorandum.dto");
const update_memorandum_dto_1 = require("./dto/update-memorandum.dto");
const user_decorator_1 = require("../../decorators/user.decorator");
const get_memorandum_dto_1 = require("./dto/get-memorandum.dto");
let MemorandumsController = class MemorandumsController {
    memorandumsService;
    constructor(memorandumsService) {
        this.memorandumsService = memorandumsService;
    }
    create(user, createMemorandumDto) {
        return this.memorandumsService.create(user.uid, createMemorandumDto);
    }
    findAll(user, getMemorandumDto) {
        return this.memorandumsService.findAll(user.uid, getMemorandumDto);
    }
    findOne(user, id) {
        return this.memorandumsService.findOne(id, user.uid);
    }
    update(user, updateMemorandumDto) {
        return this.memorandumsService.update(user.uid, updateMemorandumDto);
    }
    remove(user, id) {
        return this.memorandumsService.remove(id, user.uid);
    }
};
exports.MemorandumsController = MemorandumsController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_memorandum_dto_1.CreateMemorandumDto]),
    __metadata("design:returntype", void 0)
], MemorandumsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('getAll'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_memorandum_dto_1.GetMemorandumDto]),
    __metadata("design:returntype", void 0)
], MemorandumsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('get'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MemorandumsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_memorandum_dto_1.UpdateMemorandumDto]),
    __metadata("design:returntype", void 0)
], MemorandumsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MemorandumsController.prototype, "remove", null);
exports.MemorandumsController = MemorandumsController = __decorate([
    (0, common_1.Controller)('memorandum'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __metadata("design:paramtypes", [memorandums_service_1.MemorandumsService])
], MemorandumsController);
//# sourceMappingURL=memorandums.controller.js.map