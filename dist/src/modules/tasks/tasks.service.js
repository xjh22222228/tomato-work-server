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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dayjs = require("dayjs");
const task_entity_1 = require("./entities/task.entity");
let TasksService = class TasksService {
    tasksRepository;
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async create(uid, createTaskDto) {
        const newTask = this.tasksRepository.create({
            ...createTaskDto,
            uid,
        });
        return this.tasksRepository.save(newTask);
    }
    async findAll(uid, getTaskDto) {
        const startOfDay = dayjs(getTaskDto.startDate).startOf('day').valueOf();
        const endOfDay = dayjs(getTaskDto.endDate).endOf('day').valueOf();
        return this.tasksRepository.find({
            where: {
                uid,
                date: (0, typeorm_2.Between)(startOfDay, endOfDay),
            },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, uid) {
        const task = await this.tasksRepository.findOne({
            where: { id, uid },
        });
        if (!task) {
            throw new common_1.NotFoundException('任务不存在');
        }
        return task;
    }
    async update(uid, updateTaskDto) {
        const { id, ...updateData } = updateTaskDto;
        await this.tasksRepository.update({ uid, id }, updateData);
        return await this.findOne(id, uid);
    }
    async remove(id, uid) {
        const result = await this.tasksRepository.delete({ id, uid });
        if (result.affected === 0) {
            throw new common_1.NotFoundException('任务不存在');
        }
    }
    async updateBeforeToDay() {
        await this.tasksRepository.update({
            date: (0, typeorm_2.LessThan)(dayjs().startOf('day').valueOf()),
            type: (0, typeorm_2.Not)((0, typeorm_2.In)([3, 4])),
        }, {
            type: 4,
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map