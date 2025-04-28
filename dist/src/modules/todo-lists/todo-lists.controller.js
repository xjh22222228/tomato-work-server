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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListsController = void 0;
const common_1 = require("@nestjs/common");
const user_auth_guard_1 = require("../../guards/user-auth.guard");
const user_decorator_1 = require("../../decorators/user.decorator");
const todo_lists_service_1 = require("./todo-lists.service");
const create_todo_list_dto_1 = require("./dto/create-todo-list.dto");
const update_todo_list_dto_1 = require("./dto/update-todo-list.dto");
const get_todo_list_dto_1 = require("./dto/get-todo-list.dto");
let TodoListsController = class TodoListsController {
    todoListsService;
    constructor(todoListsService) {
        this.todoListsService = todoListsService;
    }
    create(user, createTodoListDto) {
        return this.todoListsService.create(user.uid, createTodoListDto);
    }
    findAll(user, getTodoListDto) {
        return this.todoListsService.findAll(user.uid, getTodoListDto);
    }
    findOne(user, id) {
        return this.todoListsService.findOne(id, user.uid);
    }
    update(user, updateTodoListDto) {
        return this.todoListsService.update(user.uid, updateTodoListDto);
    }
    remove(user, id) {
        return this.todoListsService.remove(id, user.uid);
    }
};
exports.TodoListsController = TodoListsController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_todo_list_dto_1.CreateTodoListDto]),
    __metadata("design:returntype", void 0)
], TodoListsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('getAll'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_todo_list_dto_1.GetTodoListDto]),
    __metadata("design:returntype", void 0)
], TodoListsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TodoListsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_todo_list_dto_1.UpdateTodoListDto]),
    __metadata("design:returntype", void 0)
], TodoListsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TodoListsController.prototype, "remove", null);
exports.TodoListsController = TodoListsController = __decorate([
    (0, common_1.Controller)('todo-list'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __metadata("design:paramtypes", [todo_lists_service_1.TodoListsService])
], TodoListsController);
//# sourceMappingURL=todo-lists.controller.js.map