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
exports.BillTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bill_type_entity_1 = require("./entities/bill-type.entity");
let BillTypesService = class BillTypesService {
    billTypeRepository;
    constructor(billTypeRepository) {
        this.billTypeRepository = billTypeRepository;
    }
    async create(uid, createBillTypeDto) {
        const existingBillType = await this.findOneByName(uid, createBillTypeDto);
        if (existingBillType) {
            throw new common_1.ConflictException('不可重复创建');
        }
        const billType = this.billTypeRepository.create({
            uid,
            ...createBillTypeDto,
        });
        return this.billTypeRepository.save(billType);
    }
    async findAll(uid) {
        const billTypes = this.billTypeRepository.findBy({ uid });
        return billTypes;
    }
    async findOne(uid, id) {
        const billType = await this.billTypeRepository.findOne({
            where: { id, uid },
        });
        if (!billType) {
            throw new common_1.NotFoundException('账单类型不存在');
        }
        return billType;
    }
    async findOneByName(uid, updateBillTypeDto) {
        return this.billTypeRepository.findOne({
            where: { ...updateBillTypeDto, uid },
        });
    }
    async update(uid, updateBillTypeDto) {
        const { id, ...updateData } = updateBillTypeDto;
        await this.findOne(uid, id);
        if (updateBillTypeDto.name) {
            const existingBillType = await this.findOneByName(uid, {
                name: updateBillTypeDto.name,
                type: updateBillTypeDto.type,
            });
            if (existingBillType && existingBillType.id !== id) {
                throw new common_1.ConflictException('类型名称已存在');
            }
        }
        await this.billTypeRepository.update({ id, uid }, updateData);
    }
    async remove(uid, ids) {
        try {
            const result = await this.billTypeRepository.delete({
                id: (0, typeorm_2.In)(ids),
                uid,
            });
            if (result.affected === 0) {
                throw new common_1.NotFoundException('账单类型不存在或已删除');
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('请先删除账单关类型数据');
        }
    }
};
exports.BillTypesService = BillTypesService;
exports.BillTypesService = BillTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bill_type_entity_1.BillType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BillTypesService);
//# sourceMappingURL=bill-types.service.js.map