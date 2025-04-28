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
exports.InnerMessagesController = void 0;
const common_1 = require("@nestjs/common");
const user_auth_guard_1 = require("../../guards/user-auth.guard");
const inner_messages_service_1 = require("./inner-messages.service");
const create_inner_message_dto_1 = require("./dto/create-inner-message.dto");
const update_inner_message_dto_1 = require("./dto/update-inner-message.dto");
let InnerMessagesController = class InnerMessagesController {
    innerMessagesService;
    constructor(innerMessagesService) {
        this.innerMessagesService = innerMessagesService;
    }
    create(req, createInnerMessageDto) {
        return this.innerMessagesService.create(req.user.uid, createInnerMessageDto);
    }
    async findAll(req) {
        return {
            rows: await this.innerMessagesService.findAll(req.user.uid),
        };
    }
    findUnread(req) {
        return this.innerMessagesService.findUnread(req.user.uid);
    }
    findOne(req, id) {
        return this.innerMessagesService.findOne(id, req.user.uid);
    }
    update(req, id, updateInnerMessageDto) {
        return this.innerMessagesService.update(id, req.user.uid, updateInnerMessageDto);
    }
    markAsRead(req, id) {
        return this.innerMessagesService.markAsRead(id, req.user.uid);
    }
    remove(req, id) {
        return this.innerMessagesService.remove(id, req.user.uid);
    }
};
exports.InnerMessagesController = InnerMessagesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_inner_message_dto_1.CreateInnerMessageDto]),
    __metadata("design:returntype", void 0)
], InnerMessagesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('get'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InnerMessagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('unread'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InnerMessagesController.prototype, "findUnread", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], InnerMessagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_inner_message_dto_1.UpdateInnerMessageDto]),
    __metadata("design:returntype", void 0)
], InnerMessagesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], InnerMessagesController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], InnerMessagesController.prototype, "remove", null);
exports.InnerMessagesController = InnerMessagesController = __decorate([
    (0, common_1.Controller)('inner-messages'),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __metadata("design:paramtypes", [inner_messages_service_1.InnerMessagesService])
], InnerMessagesController);
//# sourceMappingURL=inner-messages.controller.js.map