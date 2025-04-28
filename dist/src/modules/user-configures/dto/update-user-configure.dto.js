"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserConfigureDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_configure_dto_1 = require("./create-user-configure.dto");
class UpdateUserConfigureDto extends (0, mapped_types_1.PartialType)(create_user_configure_dto_1.CreateUserConfigureDto) {
}
exports.UpdateUserConfigureDto = UpdateUserConfigureDto;
//# sourceMappingURL=update-user-configure.dto.js.map