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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("./entities/company.entity");
const logs_service_1 = require("../logs/logs.service");
let CompanyService = class CompanyService {
    companyRepository;
    logsService;
    constructor(companyRepository, logsService) {
        this.companyRepository = companyRepository;
        this.logsService = logsService;
    }
    async create(uid, createCompanyDto) {
        const newCompany = this.companyRepository.create({
            ...createCompanyDto,
            uid,
        });
        return this.companyRepository.save(newCompany);
    }
    async findAll(uid, getCompanyDto) {
        const { pageNo, pageSize } = getCompanyDto;
        const [rows, count] = await this.companyRepository.findAndCount({
            where: { uid },
            order: { startDate: 'DESC' },
            skip: pageNo && pageSize && pageNo * pageSize,
            take: pageSize,
        });
        return {
            rows,
            count,
        };
    }
    async findOne(id, uid) {
        const company = await this.companyRepository.findOne({
            where: { id, uid },
        });
        if (!company) {
            throw new common_1.NotFoundException('公司不存在');
        }
        return company;
    }
    async findByIds(ids) {
        return this.companyRepository.findBy({
            id: (0, typeorm_2.In)(ids),
        });
    }
    async update(uid, updateCompanyDto) {
        const { id, ...updateData } = updateCompanyDto;
        await this.companyRepository.update({ id, uid }, updateData);
        return this.findOne(id, uid);
    }
    async remove(id, uid) {
        const log = await this.logsService.findOne({ companyId: id }, uid);
        if (log) {
            throw new common_1.InternalServerErrorException(`公司下存在日志，无法删除 ${log.id}`);
        }
        const result = await this.companyRepository.delete({ id, uid });
        if (result.affected === 0) {
            throw new common_1.NotFoundException();
        }
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        logs_service_1.LogsService])
], CompanyService);
//# sourceMappingURL=company.service.js.map