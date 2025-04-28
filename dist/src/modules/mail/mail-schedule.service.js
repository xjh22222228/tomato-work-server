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
var MailScheduleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailScheduleService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mail_service_1 = require("./mail.service");
let MailScheduleService = MailScheduleService_1 = class MailScheduleService {
    mailService;
    logger = new common_1.Logger(MailScheduleService_1.name);
    constructor(mailService) {
        this.mailService = mailService;
    }
    async handleCron() {
        this.logger.debug('定时任务 - 检查提醒事项');
        try {
            await this.mailService.sendReminder();
        }
        catch (error) {
            this.logger.error('发送提醒邮件失败', error);
        }
    }
};
exports.MailScheduleService = MailScheduleService;
__decorate([
    (0, schedule_1.Cron)('0 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MailScheduleService.prototype, "handleCron", null);
exports.MailScheduleService = MailScheduleService = MailScheduleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailScheduleService);
//# sourceMappingURL=mail-schedule.service.js.map