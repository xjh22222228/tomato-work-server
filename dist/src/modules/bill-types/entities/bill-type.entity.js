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
exports.BillType = void 0;
const typeorm_1 = require("typeorm");
const date_entity_1 = require("../../../entities/date.entity");
let BillType = class BillType extends date_entity_1.DateEntity {
    id;
    uid;
    sortIndex;
    name;
    type;
};
exports.BillType = BillType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'id' }),
    __metadata("design:type", String)
], BillType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BillType.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_index', default: 0 }),
    __metadata("design:type", Number)
], BillType.prototype, "sortIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: '' }),
    __metadata("design:type", String)
], BillType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1, comment: '1=收入, 2=支出' }),
    __metadata("design:type", Number)
], BillType.prototype, "type", void 0);
exports.BillType = BillType = __decorate([
    (0, typeorm_1.Entity)('bill_types')
], BillType);
//# sourceMappingURL=bill-type.entity.js.map