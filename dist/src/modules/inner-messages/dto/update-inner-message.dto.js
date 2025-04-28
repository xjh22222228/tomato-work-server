"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInnerMessageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_inner_message_dto_1 = require("./create-inner-message.dto");
class UpdateInnerMessageDto extends (0, mapped_types_1.PartialType)(create_inner_message_dto_1.CreateInnerMessageDto) {
}
exports.UpdateInnerMessageDto = UpdateInnerMessageDto;
//# sourceMappingURL=update-inner-message.dto.js.map