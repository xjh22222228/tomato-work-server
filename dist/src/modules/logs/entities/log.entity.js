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
exports.Log = void 0;
const typeorm_1 = require("typeorm");
const date_entity_1 = require("../../../entities/date.entity");
let Log = class Log extends date_entity_1.DateEntity {
    id;
    uid;
    companyId;
    logType;
    doneContent;
    undoneContent;
    planContent;
    summaryContent;
};
exports.Log = Log;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Log.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Log.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'company_id' }),
    __metadata("design:type", String)
], Log.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'log_type', comment: '日志类型, 1=日报、2=周报、3=月报' }),
    __metadata("design:type", Number)
], Log.prototype, "logType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'done_content', type: 'text' }),
    __metadata("design:type", String)
], Log.prototype, "doneContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'undone_content', type: 'text' }),
    __metadata("design:type", String)
], Log.prototype, "undoneContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plan_content', type: 'text' }),
    __metadata("design:type", String)
], Log.prototype, "planContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'summary_content', type: 'text' }),
    __metadata("design:type", String)
], Log.prototype, "summaryContent", void 0);
exports.Log = Log = __decorate([
    (0, typeorm_1.Entity)('logs')
], Log);
//# sourceMappingURL=log.entity.js.map