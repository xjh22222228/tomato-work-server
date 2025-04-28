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
exports.UpdateMemorandumDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_memorandum_dto_1 = require("./create-memorandum.dto");
const class_validator_1 = require("class-validator");
class UpdateMemorandumDto extends (0, mapped_types_1.PartialType)(create_memorandum_dto_1.CreateMemorandumDto) {
    id;
}
exports.UpdateMemorandumDto = UpdateMemorandumDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMemorandumDto.prototype, "id", void 0);
//# sourceMappingURL=update-memorandum.dto.js.map