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
exports.InnerMessage = void 0;
const typeorm_1 = require("typeorm");
let InnerMessage = class InnerMessage {
    id;
    uid;
    content;
    type;
    hasRead;
    createdAt;
    updatedAt;
};
exports.InnerMessage = InnerMessage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InnerMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InnerMessage.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InnerMessage.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '消息类型, 0=系统消息' }),
    __metadata("design:type", Number)
], InnerMessage.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'has_read', default: false }),
    __metadata("design:type", Boolean)
], InnerMessage.prototype, "hasRead", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], InnerMessage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], InnerMessage.prototype, "updatedAt", void 0);
exports.InnerMessage = InnerMessage = __decorate([
    (0, typeorm_1.Entity)('inner_messages')
], InnerMessage);
//# sourceMappingURL=inner-message.entity.js.map