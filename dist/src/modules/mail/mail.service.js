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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const axios_1 = require("axios");
const reminders_service_1 = require("../reminders/reminders.service");
let MailService = MailService_1 = class MailService {
    configService;
    remindersService;
    logger = new common_1.Logger(MailService_1.name);
    transporter;
    constructor(configService, remindersService) {
        this.configService = configService;
        this.remindersService = remindersService;
        this.initTransporter();
    }
    initTransporter() {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('MAIL_HOST'),
            port: this.configService.get('MAIL_PORT'),
            secure: this.configService.get('MAIL_SECURE'),
            auth: {
                user: this.configService.get('MAIL_USER'),
                pass: this.configService.get('MAIL_PASS'),
            },
        });
    }
    async wechatPush(data) {
        if (!data.sckey)
            return;
        const params = {
            msgtype: 'markdown',
            markdown: {
                content: `
# ${data.subject || ''}

${data.markdown || ''}
`,
            },
        };
        try {
            await axios_1.default.post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${data.sckey}`, params);
        }
        catch (error) {
            this.logger.error(`微信推送失败: ${error.message}`);
        }
    }
    async register(loginName) {
        const adminEmail = this.configService.get('ADMIN_EMAIL');
        if (!adminEmail)
            return;
        await this.send({
            to: adminEmail,
            subject: '用户注册通知',
            html: `用户：${loginName} 成功注册了本站`,
        });
    }
    async send(data) {
        let retries = 3;
        while (retries--) {
            try {
                const mailOptions = {
                    from: this.configService.get('MAIL_USER'),
                    to: data.to,
                    subject: data.subject,
                    html: data.html,
                    text: data.text,
                };
                const result = await this.transporter.sendMail(mailOptions);
                this.logger.log(`邮箱: ${data.to} 发送成功`);
                return result;
            }
            catch (err) {
                this.logger.error(`邮箱：${data.to} 发送失败，原因：${err.message}`);
                if (retries <= 0) {
                    throw err;
                }
            }
        }
    }
    async sendReminder() {
        try {
            const appTitle = this.configService.get('APP_TITLE');
            const reminderItems = await this.remindersService.findAllNotSend();
            const user = {};
            reminderItems.forEach((item) => {
                const { email, content, id, sckey } = item;
                if (email in user) {
                    user[email].content.push(content);
                    user[email].ids.push(id);
                }
                else {
                    user[email] = {
                        content: [content],
                        ids: [id],
                        sckey,
                    };
                }
            });
            for (let email in user) {
                const { content, ids, sckey } = user[email];
                let html = '';
                let markdown = '';
                content.forEach((text, idx) => {
                    html += `<h2>${idx + 1}：${text}</h2>`;
                    markdown += `${idx + 1}：${text}\n`;
                });
                const mailData = {
                    to: email,
                    subject: `您有${content.length}项提醒事项 - ${appTitle}`,
                    html,
                    sckey,
                    markdown,
                };
                await this.wechatPush(mailData);
                try {
                    await this.send(mailData);
                    this.logger.log(`${email} 发送成功!`);
                    await this.remindersService.updateTypeById(ids, 2);
                }
                catch (error) {
                    this.logger.error(`发送提醒邮件失败: ${error.message}`);
                }
            }
        }
        catch (err) {
            this.logger.error(`发送提醒事项失败: ${err.message}`);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        reminders_service_1.RemindersService])
], MailService);
//# sourceMappingURL=mail.service.js.map