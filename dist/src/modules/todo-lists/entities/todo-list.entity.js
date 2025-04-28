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
exports.TodoList = void 0;
const typeorm_1 = require("typeorm");
const transformerUtils_1 = require("../../../utils/transformerUtils");
let TodoList = class TodoList {
    id;
    uid;
    content;
    status;
    createdAt;
    updatedAt;
};
exports.TodoList = TodoList;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TodoList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TodoList.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], TodoList.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1, comment: '状态, 1=进行中, 2=完成' }),
    __metadata("design:type", Number)
], TodoList.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', transformer: (0, transformerUtils_1.dateTransformer)() }),
    __metadata("design:type", Date)
], TodoList.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', transformer: (0, transformerUtils_1.dateTransformer)() }),
    __metadata("design:type", Date)
], TodoList.prototype, "updatedAt", void 0);
exports.TodoList = TodoList = __decorate([
    (0, typeorm_1.Entity)('todo_lists')
], TodoList);
//# sourceMappingURL=todo-list.entity.js.map