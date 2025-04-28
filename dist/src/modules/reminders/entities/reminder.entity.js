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
exports.Reminder = void 0;
const typeorm_1 = require("typeorm");
const transformerUtils_1 = require("../../../utils/transformerUtils");
const date_entity_1 = require("../../../entities/date.entity");
let Reminder = class Reminder extends date_entity_1.DateEntity {
    id;
    uid;
    content;
    date;
    type;
};
exports.Reminder = Reminder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Reminder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Reminder.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reminder.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', transformer: (0, transformerUtils_1.dateTransformer)() }),
    __metadata("design:type", Object)
], Reminder.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        default: 1,
        comment: '事项类型, 1=待提醒, 2=已提醒',
    }),
    __metadata("design:type", Number)
], Reminder.prototype, "type", void 0);
exports.Reminder = Reminder = __decorate([
    (0, typeorm_1.Entity)('reminders')
], Reminder);
//# sourceMappingURL=reminder.entity.js.map