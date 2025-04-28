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
exports.Bill = void 0;
const typeorm_1 = require("typeorm");
const bill_type_entity_1 = require("../../bill-types/entities/bill-type.entity");
const date_entity_1 = require("../../../entities/date.entity");
const transformerUtils_1 = require("../../../utils/transformerUtils");
let Bill = class Bill extends date_entity_1.DateEntity {
    id;
    uid;
    price;
    date;
    typeId;
    remark;
    imgs;
    billType;
};
exports.Bill = Bill;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Bill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Bill.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 19,
        scale: 2,
        default: 0,
        transformer: (0, transformerUtils_1.numberTransformer)(),
    }),
    __metadata("design:type", Number)
], Bill.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', transformer: (0, transformerUtils_1.numberTransformer)() }),
    __metadata("design:type", Number)
], Bill.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type_id' }),
    __metadata("design:type", String)
], Bill.prototype, "typeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250, default: '' }),
    __metadata("design:type", String)
], Bill.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Bill.prototype, "imgs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bill_type_entity_1.BillType),
    (0, typeorm_1.JoinColumn)({ name: 'type_id' }),
    __metadata("design:type", bill_type_entity_1.BillType)
], Bill.prototype, "billType", void 0);
exports.Bill = Bill = __decorate([
    (0, typeorm_1.Entity)('bills')
], Bill);
//# sourceMappingURL=bill.entity.js.map