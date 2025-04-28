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
exports.CommonController = void 0;
const common_1 = require("@nestjs/common");
const dayjs = require("dayjs");
const svgCaptcha = require("svg-captcha");
const user_auth_guard_1 = require("../../guards/user-auth.guard");
const user_decorator_1 = require("../../decorators/user.decorator");
const common_service_1 = require("./common.service");
const bills_service_1 = require("../bills/bills.service");
const tasks_service_1 = require("../tasks/tasks.service");
const todo_lists_service_1 = require("../todo-lists/todo-lists.service");
const reminders_service_1 = require("../reminders/reminders.service");
let CommonController = class CommonController {
    commonService;
    billsService;
    tasksService;
    todoListsService;
    remindersService;
    constructor(commonService, billsService, tasksService, todoListsService, remindersService) {
        this.commonService = commonService;
        this.billsService = billsService;
        this.tasksService = tasksService;
        this.todoListsService = todoListsService;
        this.remindersService = remindersService;
    }
    getIndex() {
        return 'Welcome to Tomaro Work !';
    }
    getCaptcha(code = '1234', res) {
        const captcha = svgCaptcha.create({
            size: 4,
            ignoreChars: '0o1il',
            noise: 2,
            color: true,
            background: '#f0f0f0',
        });
        res.type('svg');
        res.send(captcha.data);
    }
    async getPanelData(user) {
        const currentDate = dayjs().format('YYYY-MM-DD');
        const [consumption, todayTasks, unfinishedTodoLists, reminders] = await Promise.all([
            this.billsService.findSumPriceByDate(user.uid, {
                startDate: currentDate,
                endDate: currentDate,
            }),
            this.tasksService.findAll(user.uid, {
                startDate: currentDate,
                endDate: currentDate,
            }),
            this.todoListsService.findAll(user.uid, { status: 1 }),
            this.remindersService.findAll(user.uid, { type: 1 }),
        ]);
        return {
            consumption: consumption.find((item) => item.type === 2)?.price,
            todayTaskCount: todayTasks.length,
            unfinishedTodoListCount: unfinishedTodoLists.rows.length,
            reminderCount: reminders.count,
        };
    }
};
exports.CommonController = CommonController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], CommonController.prototype, "getIndex", null);
__decorate([
    (0, common_1.Get)('captcha'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommonController.prototype, "getCaptcha", null);
__decorate([
    (0, common_1.Post)('panel'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "getPanelData", null);
exports.CommonController = CommonController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [common_service_1.CommonService,
        bills_service_1.BillsService,
        tasks_service_1.TasksService,
        todo_lists_service_1.TodoListsService,
        reminders_service_1.RemindersService])
], CommonController);
//# sourceMappingURL=common.controller.js.map