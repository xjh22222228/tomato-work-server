"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.md5 = md5;
const crypto = require("crypto");
function md5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}
//# sourceMappingURL=crypto.js.map