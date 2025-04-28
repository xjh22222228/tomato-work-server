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
exports.DateEntity = void 0;
const typeorm_1 = require("typeorm");
const transformerUtils_1 = require("../utils/transformerUtils");
class DateEntity {
    createdAt;
    updatedAt;
}
exports.DateEntity = DateEntity;
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', transformer: (0, transformerUtils_1.dateTransformer)() }),
    __metadata("design:type", Date)
], DateEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', transformer: (0, transformerUtils_1.dateTransformer)() }),
    __metadata("design:type", Date)
], DateEntity.prototype, "updatedAt", void 0);
//# sourceMappingURL=date.entity.js.map