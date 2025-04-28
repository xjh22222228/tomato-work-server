"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTransformer = dateTransformer;
exports.numberTransformer = numberTransformer;
const dayjs = require("dayjs");
function dateTransformer(format = 'YYYY-MM-DD HH:mm:ss') {
    return {
        from: (value) => {
            if (!value) {
                return value;
            }
            const numberValue = Number(value);
            if (numberValue) {
                value = numberValue;
            }
            return dayjs(value).format(format);
        },
        to: (value) => value,
    };
}
function numberTransformer() {
    return {
        from: (value) => {
            if (!value) {
                return value;
            }
            return Number(value);
        },
        to: (value) => value,
    };
}
//# sourceMappingURL=transformerUtils.js.map