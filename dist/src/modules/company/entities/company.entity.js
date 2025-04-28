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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const date_entity_1 = require("../../../entities/date.entity");
const transformerUtils_1 = require("../../../utils/transformerUtils");
let Company = class Company extends date_entity_1.DateEntity {
    id;
    uid;
    companyName;
    startDate;
    endDate;
    remark;
    amount;
    expectLeaveDate;
};
exports.Company = Company;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Company.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_name' }),
    __metadata("design:type", String)
], Company.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'start_date',
        type: 'datetime',
        transformer: (0, transformerUtils_1.dateTransformer)(),
    }),
    __metadata("design:type", Date)
], Company.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'end_date',
        type: 'datetime',
        nullable: true,
        transformer: (0, transformerUtils_1.dateTransformer)(),
    }),
    __metadata("design:type", Date)
], Company.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Company.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 19, scale: 2 }),
    __metadata("design:type", Number)
], Company.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'expect_leave_date',
        type: 'datetime',
        nullable: true,
        transformer: (0, transformerUtils_1.dateTransformer)(),
    }),
    __metadata("design:type", Date)
], Company.prototype, "expectLeaveDate", void 0);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)('company')
], Company);
//# sourceMappingURL=company.entity.js.map