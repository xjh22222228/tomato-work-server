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
exports.InnerMessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const inner_message_entity_1 = require("./entities/inner-message.entity");
let InnerMessagesService = class InnerMessagesService {
    innerMessagesRepository;
    constructor(innerMessagesRepository) {
        this.innerMessagesRepository = innerMessagesRepository;
    }
    async create(uid, createInnerMessageDto) {
        const newInnerMessage = this.innerMessagesRepository.create({
            ...createInnerMessageDto,
            uid,
            id: (0, uuid_1.v4)(),
            type: createInnerMessageDto.type || 0,
            hasRead: createInnerMessageDto.hasRead || false,
        });
        return this.innerMessagesRepository.save(newInnerMessage);
    }
    async findAll(uid) {
        return this.innerMessagesRepository.find({
            where: { uid },
            order: { createdAt: 'DESC' },
        });
    }
    async findUnread(uid) {
        return this.innerMessagesRepository.find({
            where: { uid, hasRead: false },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, uid) {
        const innerMessage = await this.innerMessagesRepository.findOne({
            where: { id, uid },
        });
        if (!innerMessage) {
            throw new common_1.NotFoundException('消息不存在');
        }
        return innerMessage;
    }
    async update(id, uid, updateInnerMessageDto) {
        const innerMessage = await this.findOne(id, uid);
        const updatedInnerMessage = Object.assign(innerMessage, updateInnerMessageDto);
        return this.innerMessagesRepository.save(updatedInnerMessage);
    }
    async markAsRead(id, uid) {
        const innerMessage = await this.findOne(id, uid);
        innerMessage.hasRead = true;
        return this.innerMessagesRepository.save(innerMessage);
    }
    async remove(id, uid) {
        const result = await this.innerMessagesRepository.delete({ id, uid });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('消息不存在');
        }
    }
};
exports.InnerMessagesService = InnerMessagesService;
exports.InnerMessagesService = InnerMessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inner_message_entity_1.InnerMessage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InnerMessagesService);
//# sourceMappingURL=inner-messages.service.js.map