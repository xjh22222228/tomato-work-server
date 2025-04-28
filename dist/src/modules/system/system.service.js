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
exports.SystemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const os = require("os");
let SystemService = class SystemService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getSystemInfo() {
        const mysqlResult = await this.dataSource.query('SELECT VERSION() as mysqlVersion');
        const mysqlVersion = mysqlResult[0]?.mysqlVersion || '';
        return {
            mysqlVersion,
            currentSystemTime: Date.now(),
            freemem: os.freemem(),
            totalmem: os.totalmem(),
            platform: os.platform(),
            type: os.type(),
            hostname: os.hostname(),
            arch: os.arch(),
            nodeVersion: process.version,
            cpus: os.cpus(),
        };
    }
};
exports.SystemService = SystemService;
exports.SystemService = SystemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], SystemService);
//# sourceMappingURL=system.service.js.map