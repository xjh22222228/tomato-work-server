"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todo_lists_service_1 = require("./todo-lists.service");
const todo_lists_controller_1 = require("./todo-lists.controller");
const todo_list_entity_1 = require("./entities/todo-list.entity");
let TodoListsModule = class TodoListsModule {
};
exports.TodoListsModule = TodoListsModule;
exports.TodoListsModule = TodoListsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([todo_list_entity_1.TodoList])],
        controllers: [todo_lists_controller_1.TodoListsController],
        providers: [todo_lists_service_1.TodoListsService],
        exports: [todo_lists_service_1.TodoListsService],
    })
], TodoListsModule);
//# sourceMappingURL=todo-lists.module.js.map