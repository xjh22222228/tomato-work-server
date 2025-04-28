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
exports.RemindersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reminder_entity_1 = require("./entities/reminder.entity");
const user_entity_1 = require("../users/entities/user.entity");
const dayjs = require("dayjs");
let RemindersService = class RemindersService {
    remindersRepository;
    usersRepository;
    dataSource;
    constructor(remindersRepository, usersRepository, dataSource) {
        this.remindersRepository = remindersRepository;
        this.usersRepository = usersRepository;
        this.dataSource = dataSource;
    }
    async create(uid, createReminderDto) {
        const newReminder = this.remindersRepository.create({
            ...createReminderDto,
            uid,
        });
        return this.remindersRepository.save(newReminder);
    }
    async findAll(uid, getReminderDto) {
        const startDate = getReminderDto.startDate
            ? dayjs(getReminderDto.startDate).valueOf()
            : dayjs().startOf('year').valueOf();
        const endDate = getReminderDto.endDate
            ? dayjs(getReminderDto.endDate).endOf('day').valueOf()
            : dayjs().endOf('year').valueOf();
        const where = {
            uid,
            date: (0, typeorm_2.Between)(startDate, endDate),
        };
        const queryOptions = {
            where,
            order: { date: 'DESC' },
        };
        const { pageNo, pageSize, type } = getReminderDto;
        if (type) {
            where.type = type;
        }
        if (pageNo != null && pageSize != null) {
            queryOptions.skip = pageNo * pageSize;
            queryOptions.take = pageSize;
        }
        const [rows, count] = await this.remindersRepository.findAndCount(queryOptions);
        return {
            rows,
            count,
        };
    }
    async findOne(id, uid) {
        const reminder = await this.remindersRepository.findOne({
            where: { id, uid },
        });
        if (!reminder) {
            throw new common_1.NotFoundException('提醒事项不存在');
        }
        return reminder;
    }
    async update(uid, updateReminderDto) {
        const { id, ...updateData } = updateReminderDto;
        await this.remindersRepository.update({ id, uid }, updateData);
        return this.findOne(id, uid);
    }
    async remove(id, uid) {
        const result = await this.remindersRepository.delete({ id, uid });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('提醒事项不存在');
        }
    }
    async findAllNotSend() {
        const reminders = await this.dataSource.query(`SELECT
      r.content, r.id, u.email, c.server_chan_sckey AS sckey
      FROM reminders AS r, users AS u, user_configures as c
      WHERE r.type = 1 AND u.email != "" AND r.uid = u.uid AND c.uid = r.uid AND r.date <= ?`, [Date.now()]);
        return reminders;
    }
    async updateTypeById(ids, type) {
        await this.remindersRepository.update({ id: (0, typeorm_2.In)(ids) }, { type });
    }
};
exports.RemindersService = RemindersService;
exports.RemindersService = RemindersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reminder_entity_1.Reminder)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], RemindersService);
//# sourceMappingURL=reminders.service.js.map