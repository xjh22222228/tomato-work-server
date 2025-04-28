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
exports.BillsController = void 0;
const common_1 = require("@nestjs/common");
const bills_service_1 = require("./bills.service");
const create_bill_dto_1 = require("./dto/create-bill.dto");
const update_bill_dto_1 = require("./dto/update-bill.dto");
const user_auth_guard_1 = require("../../guards/user-auth.guard");
const user_decorator_1 = require("../../decorators/user.decorator");
const get_bill_dto_1 = require("./dto/get-bill.dto");
let BillsController = class BillsController {
    billsService;
    constructor(billsService) {
        this.billsService = billsService;
    }
    create(uid, createBillDto) {
        return this.billsService.create(uid, createBillDto);
    }
    findAll(uid, getBillDto) {
        return this.billsService.findAll(uid, getBillDto);
    }
    findOne(uid, id) {
        return this.billsService.findOne(uid, id);
    }
    async update(uid, updateBillDto) {
        return this.billsService.update(uid, updateBillDto);
    }
    async remove(uid, id) {
        return this.billsService.remove(uid, id);
    }
    async sumAmount(uid, getBillDto) {
        try {
            return {
                data: await this.billsService.findSumPriceByDate(uid, getBillDto),
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('获取金额统计失败');
        }
    }
    amountGroup(uid, getBillDto) {
        try {
            return this.billsService.findAmountGroup(uid, getBillDto);
        }
        catch (error) {
            throw new common_1.BadRequestException('获取分组统计失败');
        }
    }
};
exports.BillsController = BillsController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_bill_dto_1.CreateBillDto]),
    __metadata("design:returntype", void 0)
], BillsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('getAll'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, get_bill_dto_1.GetBillDto]),
    __metadata("design:returntype", void 0)
], BillsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('get'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __param(1, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], BillsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_bill_dto_1.UpdateBillDto]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __param(1, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('amount/statistics'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, get_bill_dto_1.GetBillDto]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "sumAmount", null);
__decorate([
    (0, common_1.Post)('amount/group'),
    __param(0, (0, user_decorator_1.User)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, get_bill_dto_1.GetBillDto]),
    __metadata("design:returntype", void 0)
], BillsController.prototype, "amountGroup", null);
exports.BillsController = BillsController = __decorate([
    (0, common_1.Controller)('bill'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __metadata("design:paramtypes", [bills_service_1.BillsService])
], BillsController);
//# sourceMappingURL=bills.controller.js.map