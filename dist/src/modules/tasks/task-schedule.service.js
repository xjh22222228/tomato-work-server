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
var TaskScheduleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskScheduleService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const tasks_service_1 = require("./tasks.service");
let TaskScheduleService = TaskScheduleService_1 = class TaskScheduleService {
    tasksService;
    logger = new common_1.Logger(TaskScheduleService_1.name);
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async handleCron() {
        this.logger.debug('定时任务 - 今日待办未完成设置');
        this.tasksService.updateBeforeToDay();
    }
};
exports.TaskScheduleService = TaskScheduleService;
__decorate([
    (0, schedule_1.Cron)('1 0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskScheduleService.prototype, "handleCron", null);
exports.TaskScheduleService = TaskScheduleService = TaskScheduleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TaskScheduleService);
//# sourceMappingURL=task-schedule.service.js.map