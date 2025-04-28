"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const common_controller_1 = require("./common.controller");
const common_service_1 = require("./common.service");
const bills_module_1 = require("../bills/bills.module");
const tasks_module_1 = require("../tasks/tasks.module");
const todo_lists_module_1 = require("../todo-lists/todo-lists.module");
const reminders_module_1 = require("../reminders/reminders.module");
const guards_module_1 = require("../../guards/guards.module");
const users_module_1 = require("../users/users.module");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bills_module_1.BillsModule,
            tasks_module_1.TasksModule,
            todo_lists_module_1.TodoListsModule,
            reminders_module_1.RemindersModule,
            guards_module_1.GuardsModule,
            users_module_1.UsersModule,
        ],
        controllers: [common_controller_1.CommonController],
        providers: [common_service_1.CommonService],
        exports: [common_service_1.CommonService],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map