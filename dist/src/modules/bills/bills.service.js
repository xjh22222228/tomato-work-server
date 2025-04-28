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
exports.BillsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bill_entity_1 = require("./entities/bill.entity");
const bill_type_entity_1 = require("../bill-types/entities/bill-type.entity");
const dayjs = require("dayjs");
const lodash = require("lodash");
const bignumber_js_1 = require("bignumber.js");
let BillsService = class BillsService {
    billRepository;
    billTypeRepository;
    constructor(billRepository, billTypeRepository) {
        this.billRepository = billRepository;
        this.billTypeRepository = billTypeRepository;
    }
    async create(uid, createBillDto) {
        const billType = await this.billTypeRepository.findOne({
            where: { id: createBillDto.typeId, uid },
        });
        if (!billType) {
            throw new common_1.NotFoundException('账单类型不存在');
        }
        const date = dayjs(createBillDto.date).valueOf();
        const bill = this.billRepository.create({
            ...createBillDto,
            uid,
            date,
        });
        return this.billRepository.save(bill);
    }
    async findAll(uid, getBillDto) {
        const { pageNo, pageSize, startDate, endDate, typeId, type, keyword, sort, } = getBillDto;
        const queryBuilder = this.billRepository
            .createQueryBuilder('bill')
            .leftJoinAndSelect('bill.billType', 'billType')
            .where('bill.uid = :uid', { uid });
        if (startDate && endDate) {
            queryBuilder.andWhere('bill.date BETWEEN :startDate AND :endDate', {
                startDate: dayjs(startDate).startOf('day').valueOf(),
                endDate: dayjs(endDate).endOf('day').valueOf(),
            });
        }
        if (typeId) {
            queryBuilder.andWhere('bill.typeId = :typeId', { typeId });
        }
        if (type) {
            queryBuilder.andWhere('billType.type = :type', { type });
        }
        if (keyword) {
            queryBuilder.andWhere('bill.remark LIKE :keyword', {
                keyword: `%${keyword}%`,
            });
        }
        const [field, order] = (sort || 'date-DESC').split('-');
        const fieldName = lodash.snakeCase(field);
        const orderName = order.toUpperCase();
        queryBuilder.orderBy(`bill.${fieldName}`, orderName);
        const result = await queryBuilder.getMany();
        let consumptionAmount = new bignumber_js_1.default(0);
        let incomeAmount = new bignumber_js_1.default(0);
        let availableAmount = new bignumber_js_1.default(0);
        result.forEach((item) => {
            const price = new bignumber_js_1.default(item.price);
            if (item.billType.type === 1) {
                incomeAmount = incomeAmount.plus(price);
            }
            else {
                consumptionAmount = consumptionAmount.plus(price);
            }
        });
        availableAmount = incomeAmount.minus(consumptionAmount);
        if (pageNo && pageSize) {
            const skip = pageNo * pageSize;
            queryBuilder.skip(skip).take(pageSize);
        }
        const [rows, count] = await queryBuilder.getManyAndCount();
        return {
            rows,
            count,
            consumptionAmount: consumptionAmount.toNumber(),
            incomeAmount: incomeAmount.toNumber(),
            availableAmount: availableAmount.toNumber(),
        };
    }
    async findOne(uid, id) {
        const bill = await this.billRepository.findOne({
            where: { id, uid },
            relations: ['billType'],
        });
        if (!bill) {
            throw new common_1.NotFoundException('账单不存在');
        }
        return bill;
    }
    async update(uid, updateBillDto) {
        const { id, ...updateData } = updateBillDto;
        const bill = await this.findOne(uid, id);
        if (updateBillDto.typeId && updateBillDto.typeId !== bill.typeId) {
            const billType = await this.billTypeRepository.findOne({
                where: { id: updateBillDto.typeId, uid },
            });
            if (!billType) {
                throw new common_1.NotFoundException('账单类型不存在');
            }
        }
        await this.billRepository.update({ id, uid }, {
            ...updateData,
            date: dayjs(updateBillDto.date).valueOf(),
        });
    }
    async remove(uid, id) {
        const result = await this.billRepository.delete({ id, uid });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('账单不存在或已删除');
        }
    }
    async findSumPriceByDate(uid, getBillDto) {
        const startDate = getBillDto.startDate;
        const endDate = getBillDto.endDate;
        const result = await this.billRepository.query(`SELECT 
      SUM(a.price) AS price,
      b.type,
      DATE(a.created_at) AS date
      from bills AS a,
      bill_types AS b
      WHERE a.type_id = b.id AND a.uid = ? AND DATE(a.created_at) >= ? AND DATE(a.created_at) <= ? 
      GROUP BY b.type,
      DATE(a.created_at)
      ORDER BY DATE(a.created_at);`, [uid, startDate, endDate]);
        const startDateObject = dayjs(startDate);
        const endDateObject = dayjs(endDate);
        const diffDay = endDateObject.diff(startDateObject, 'day') + 1;
        const data = [];
        for (let i = 0; i < diffDay; i++) {
            const payload = {
                date: dayjs(startDate).add(i, 'd').format('YYYY-MM-DD'),
                price: 0,
                name: '收入',
                type: 1,
            };
            data.push(payload, {
                ...payload,
                name: '支出',
                type: 2,
            });
        }
        result.forEach((item) => {
            const idx = data.findIndex((el) => dayjs(el.date).format('YYYY-MM-DD') ===
                dayjs(item.date).format('YYYY-MM-DD'));
            if (idx >= 0) {
                if (item.type === 1) {
                    data[idx].price = item.price;
                }
                else {
                    data[idx + 1].price = item.price;
                }
            }
        });
        return data;
    }
    async findAmountGroup(uid, getBillDto) {
        const result = this.billRepository.query(`
      SELECT 
      SUM(f.price) as amount, t.type, t.name
      FROM bills AS f
      INNER JOIN bill_types as t
      ON f.uid = ? AND t.id = f.type_id
      AND DATE(f.created_at) >= ? AND DATE(f.created_at) <= ?
      GROUP BY t.type, t.name;
        `, [uid, getBillDto.startDate, getBillDto.endDate]);
        return await result;
    }
};
exports.BillsService = BillsService;
exports.BillsService = BillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bill_entity_1.Bill)),
    __param(1, (0, typeorm_1.InjectRepository)(bill_type_entity_1.BillType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BillsService);
//# sourceMappingURL=bills.service.js.map