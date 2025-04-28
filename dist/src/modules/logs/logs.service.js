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
exports.LogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const log_entity_1 = require("./entities/log.entity");
const company_entity_1 = require("../company/entities/company.entity");
const dayjs = require("dayjs");
let LogsService = class LogsService {
    logsRepository;
    companyRepository;
    constructor(logsRepository, companyRepository) {
        this.logsRepository = logsRepository;
        this.companyRepository = companyRepository;
    }
    async create(uid, createLogDto) {
        const newLog = this.logsRepository.create({
            ...createLogDto,
            uid,
        });
        return this.logsRepository.save(newLog);
    }
    async findAll(uid, getLogDto) {
        const { companyId, logType, startDate, endDate, pageNo, pageSize } = getLogDto;
        const query = { uid };
        if (companyId) {
            query.companyId = companyId;
        }
        if (logType) {
            query.logType = logType;
        }
        if (startDate && endDate) {
            query.createdAt = (0, typeorm_2.Between)(dayjs(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss'), dayjs(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss'));
        }
        const [rows, count] = await this.logsRepository.findAndCount({
            where: query,
            order: { createdAt: 'DESC' },
            skip: pageNo && pageSize && pageNo * pageSize,
            take: pageSize,
        });
        const companyIds = rows.map((log) => log.companyId);
        const companies = await this.companyRepository.findBy({
            id: (0, typeorm_2.In)(companyIds),
        });
        const companyMap = new Map(companies.map((company) => [company.id, company.companyName]));
        const result = rows.map((log) => ({
            ...log,
            companyName: companyMap.get(log.companyId) || '',
        }));
        return {
            rows: result,
            count,
        };
    }
    async findOne(getLogDto, uid) {
        const log = await this.logsRepository.findOne({
            where: { ...getLogDto, uid },
        });
        if (!log) {
            throw new common_1.NotFoundException('日志不存在');
        }
        return log;
    }
    async update(uid, updateLogDto) {
        const { id, ...updateData } = updateLogDto;
        await this.logsRepository.update({ id, uid }, updateData);
        return await this.findOne({ id }, uid);
    }
    async remove(id, uid) {
        const result = await this.logsRepository.delete({ id, uid });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('日志不存在');
        }
    }
};
exports.LogsService = LogsService;
exports.LogsService = LogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(log_entity_1.Log)),
    __param(1, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LogsService);
//# sourceMappingURL=logs.service.js.map