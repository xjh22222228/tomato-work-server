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
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const date_entity_1 = require("../../../entities/date.entity");
const transformerUtils_1 = require("../../../utils/transformerUtils");
let Task = class Task extends date_entity_1.DateEntity {
    id;
    uid;
    content;
    date;
    type;
    count;
};
exports.Task = Task;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Task.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Task.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', transformer: (0, transformerUtils_1.dateTransformer)() }),
    __metadata("design:type", Number)
], Task.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        default: 1,
        comment: '进度类型: 1=待作业, 2=作业中, 3=已完成, 4=未完成',
    }),
    __metadata("design:type", Number)
], Task.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0, comment: '待办优先级, 0-5' }),
    __metadata("design:type", Number)
], Task.prototype, "count", void 0);
exports.Task = Task = __decorate([
    (0, typeorm_1.Entity)('tasks')
], Task);
//# sourceMappingURL=task.entity.js.map