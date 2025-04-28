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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBillTypeDto = exports.BillType = void 0;
const class_validator_1 = require("class-validator");
var BillType;
(function (BillType) {
    BillType[BillType["INCOME"] = 1] = "INCOME";
    BillType[BillType["EXPENSE"] = 2] = "EXPENSE";
})(BillType || (exports.BillType = BillType = {}));
class CreateBillTypeDto {
    name;
    type;
    sortIndex;
}
exports.CreateBillTypeDto = CreateBillTypeDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20, { message: '类型名称不能超过20个字符' }),
    __metadata("design:type", String)
], CreateBillTypeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(BillType, { message: '类型必须是1(收入)或2(支出)' }),
    __metadata("design:type", Number)
], CreateBillTypeDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateBillTypeDto.prototype, "sortIndex", void 0);
//# sourceMappingURL=create-bill-type.dto.js.map