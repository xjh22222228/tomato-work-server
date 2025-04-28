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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConfigure = void 0;
const typeorm_1 = require("typeorm");
const date_entity_1 = require("../../../entities/date.entity");
let UserConfigure = class UserConfigure extends date_entity_1.DateEntity {
    id;
    uid;
    isTaskNotify;
    isMatterNotify;
    serverChanSckey;
};
exports.UserConfigure = UserConfigure;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'id' }),
    __metadata("design:type", String)
], UserConfigure.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], UserConfigure.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_task_notify', default: true, comment: '待办任务通知' }),
    __metadata("design:type", Boolean)
], UserConfigure.prototype, "isTaskNotify", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_matter_notify', default: true, comment: '提醒事项通知' }),
    __metadata("design:type", Boolean)
], UserConfigure.prototype, "isMatterNotify", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'server_chan_sckey',
        default: '',
        comment: '企业微信API KEY',
    }),
    __metadata("design:type", String)
], UserConfigure.prototype, "serverChanSckey", void 0);
exports.UserConfigure = UserConfigure = __decorate([
    (0, typeorm_1.Entity)('user_configures')
], UserConfigure);
//# sourceMappingURL=user-configure.entity.js.map