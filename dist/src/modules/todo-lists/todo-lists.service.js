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
exports.TodoListsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_list_entity_1 = require("./entities/todo-list.entity");
const dayjs = require("dayjs");
const pagination_1 = require("../../constants/pagination");
let TodoListsService = class TodoListsService {
    todoListsRepository;
    constructor(todoListsRepository) {
        this.todoListsRepository = todoListsRepository;
    }
    async create(uid, createTodoListDto) {
        const newTodoList = this.todoListsRepository.create({
            ...createTodoListDto,
            uid,
        });
        return this.todoListsRepository.save(newTodoList);
    }
    async findAll(uid, getTodoListDto) {
        const { startDate: start, endDate: end, status, pageNo, pageSize = pagination_1.PAGE_SIZE, } = getTodoListDto;
        const format = 'YYYY-MM-DD HH:mm:ss';
        const startDate = start
            ? dayjs(start).format(format)
            : dayjs().startOf('year').format(format);
        const endDate = end
            ? dayjs(end).endOf('day').format(format)
            : dayjs().endOf('year').format(format);
        const where = {
            uid,
            createdAt: (0, typeorm_2.Between)(startDate, endDate),
        };
        if (status) {
            where['status'] = status;
        }
        const [rows, count] = await this.todoListsRepository.findAndCount({
            where,
            order: { createdAt: 'DESC' },
            skip: pageNo ? pageNo * pageSize : undefined,
            take: pageNo ? pageSize : undefined,
        });
        return {
            rows,
            count,
        };
    }
    async findOne(id, uid) {
        const todoList = await this.todoListsRepository.findOne({
            where: { id, uid },
        });
        if (!todoList) {
            throw new common_1.NotFoundException();
        }
        return todoList;
    }
    async update(uid, updateTodoListDto) {
        const { id, ...updateData } = updateTodoListDto;
        await this.todoListsRepository.update({ uid }, updateData);
        return this.findOne(id, uid);
    }
    async remove(id, uid) {
        const result = await this.todoListsRepository.delete({ id, uid });
        if (result.affected === 0) {
            throw new common_1.NotFoundException();
        }
    }
};
exports.TodoListsService = TodoListsService;
exports.TodoListsService = TodoListsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_list_entity_1.TodoList)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TodoListsService);
//# sourceMappingURL=todo-lists.service.js.map