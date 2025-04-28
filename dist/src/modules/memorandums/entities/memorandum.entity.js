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
exports.Memorandum = void 0;
const typeorm_1 = require("typeorm");
const date_entity_1 = require("../../../entities/date.entity");
let Memorandum = class Memorandum extends date_entity_1.DateEntity {
    id;
    uid;
    sortIndex;
    title;
    markdown;
};
exports.Memorandum = Memorandum;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Memorandum.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Memorandum.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_index', default: 0 }),
    __metadata("design:type", Number)
], Memorandum.prototype, "sortIndex", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Memorandum.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", String)
], Memorandum.prototype, "markdown", void 0);
exports.Memorandum = Memorandum = __decorate([
    (0, typeorm_1.Entity)('memorandums')
], Memorandum);
//# sourceMappingURL=memorandum.entity.js.map