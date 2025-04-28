"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemorandumsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const memorandums_service_1 = require("./memorandums.service");
const memorandums_controller_1 = require("./memorandums.controller");
const memorandum_entity_1 = require("./entities/memorandum.entity");
let MemorandumsModule = class MemorandumsModule {
};
exports.MemorandumsModule = MemorandumsModule;
exports.MemorandumsModule = MemorandumsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([memorandum_entity_1.Memorandum])],
        controllers: [memorandums_controller_1.MemorandumsController],
        providers: [memorandums_service_1.MemorandumsService],
        exports: [memorandums_service_1.MemorandumsService],
    })
], MemorandumsModule);
//# sourceMappingURL=memorandums.module.js.map