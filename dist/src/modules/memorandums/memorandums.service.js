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
exports.MemorandumsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const memorandum_entity_1 = require("./entities/memorandum.entity");
const markdown_1 = require("../../utils/markdown");
let MemorandumsService = class MemorandumsService {
    memorandumsRepository;
    constructor(memorandumsRepository) {
        this.memorandumsRepository = memorandumsRepository;
    }
    async create(uid, createMemorandumDto) {
        const newMemorandum = this.memorandumsRepository.create({
            ...createMemorandumDto,
            uid,
        });
        return this.memorandumsRepository.save(newMemorandum);
    }
    async findAll(uid, getMemorandumDto) {
        const { pageNo, pageSize } = getMemorandumDto;
        const [rows, count] = await this.memorandumsRepository.findAndCount({
            where: { uid },
            order: { updatedAt: 'DESC' },
            skip: pageNo && pageSize && pageNo * pageSize,
            take: pageSize,
        });
        const result = rows.map((item) => {
            const html = markdown_1.default.render(item.markdown);
            return {
                ...item,
                html,
            };
        });
        return {
            rows: result,
            count,
        };
    }
    async findOne(id, uid) {
        const memorandum = await this.memorandumsRepository.findOne({
            where: { id, uid },
        });
        if (!memorandum) {
            throw new common_1.NotFoundException('备忘录不存在');
        }
        return {
            ...memorandum,
            html: markdown_1.default.render(memorandum.markdown),
        };
    }
    async update(uid, updateMemorandumDto) {
        const { id, ...updateData } = updateMemorandumDto;
        await this.memorandumsRepository.update({ uid, id }, updateData);
        return this.findOne(id, uid);
    }
    async remove(id, uid) {
        const result = await this.memorandumsRepository.delete({ id, uid });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('备忘录不存在');
        }
    }
};
exports.MemorandumsService = MemorandumsService;
exports.MemorandumsService = MemorandumsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(memorandum_entity_1.Memorandum)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MemorandumsService);
//# sourceMappingURL=memorandums.service.js.map