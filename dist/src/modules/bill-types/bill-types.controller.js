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
exports.BillTypesController = void 0;
const common_1 = require("@nestjs/common");
const bill_types_service_1 = require("./bill-types.service");
const create_bill_type_dto_1 = require("./dto/create-bill-type.dto");
const update_bill_type_dto_1 = require("./dto/update-bill-type.dto");
const user_auth_guard_1 = require("../../guards/user-auth.guard");
const user_decorator_1 = require("../../decorators/user.decorator");
let BillTypesController = class BillTypesController {
    billTypesService;
    constructor(billTypesService) {
        this.billTypesService = billTypesService;
    }
    create(uid, createBillTypeDto) {
        return this.billTypesService.create(uid, createBillTypeDto);
    }
    async findAll(uid) {
        return this.billTypesService.findAll(uid);
    }
    findOne(uid, id) {
        return this.billTypesService.findOne(uid, id);
    }
    async update(uid, updateBillTypeDto) {
        await this.billTypesService.update(uid, updateBillTypeDto);
        return { msg: '更新成功' };
    }
    async remove(uid, ids) {
        return this.billTypesService.remove(uid, ids);
    }
};
exports.BillTypesController = BillTypesController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_bill_type_dto_1.CreateBillTypeDto]),
    __metadata("design:returntype", void 0)
], BillTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('getAll'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BillTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('get'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __param(1, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], BillTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_bill_type_dto_1.UpdateBillTypeDto]),
    __metadata("design:returntype", Promise)
], BillTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __param(1, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], BillTypesController.prototype, "remove", null);
exports.BillTypesController = BillTypesController = __decorate([
    (0, common_1.Controller)('bill-type'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __metadata("design:paramtypes", [bill_types_service_1.BillTypesService])
], BillTypesController);
//# sourceMappingURL=bill-types.controller.js.map