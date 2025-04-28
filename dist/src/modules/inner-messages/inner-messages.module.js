"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnerMessagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inner_messages_service_1 = require("./inner-messages.service");
const inner_messages_controller_1 = require("./inner-messages.controller");
const inner_message_entity_1 = require("./entities/inner-message.entity");
let InnerMessagesModule = class InnerMessagesModule {
};
exports.InnerMessagesModule = InnerMessagesModule;
exports.InnerMessagesModule = InnerMessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([inner_message_entity_1.InnerMessage])],
        controllers: [inner_messages_controller_1.InnerMessagesController],
        providers: [inner_messages_service_1.InnerMessagesService],
        exports: [inner_messages_service_1.InnerMessagesService],
    })
], InnerMessagesModule);
//# sourceMappingURL=inner-messages.module.js.map