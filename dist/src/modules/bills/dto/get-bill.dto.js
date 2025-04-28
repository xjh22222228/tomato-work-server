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
exports.GetBillDto = void 0;
const class_validator_1 = require("class-validator");
const validatorUtils_1 = require("../../../utils/validatorUtils");
const pagination_dto_1 = require("../../../dtos/pagination.dto");
class GetBillDto extends pagination_dto_1.PaginationDto {
    startDate;
    endDate;
    typeId;
    type;
    keyword;
    sort;
}
exports.GetBillDto = GetBillDto;
__decorate([
    (0, class_validator_1.Matches)(validatorUtils_1.dateValidator.REGEXP, { message: validatorUtils_1.dateValidator.MESSAGE }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetBillDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.Matches)(validatorUtils_1.dateValidator.REGEXP, { message: validatorUtils_1.dateValidator.MESSAGE }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetBillDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetBillDto.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetBillDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetBillDto.prototype, "keyword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetBillDto.prototype, "sort", void 0);
//# sourceMappingURL=get-bill.dto.js.map