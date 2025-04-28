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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const existingUser = await this.usersRepository.findOne({
            where: [{ username: createUserDto.username }, { uid: createUserDto.uid }],
        });
        if (existingUser) {
            throw new common_1.ConflictException('用户名或用户ID已存在');
        }
        const newUser = this.usersRepository.create({
            ...createUserDto,
        });
        return this.usersRepository.save(newUser);
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async findOne(uid) {
        const numericUid = typeof uid === 'string' ? Number(uid) : uid;
        const user = await this.usersRepository.findOne({
            where: { uid: numericUid },
        });
        if (!user) {
            throw new common_1.NotFoundException('用户不存在');
        }
        return user;
    }
    async findByLoginName(loginName) {
        const user = await this.usersRepository.findOne({ where: { loginName } });
        return user || null;
    }
    async findByLoginNameAndPassword(loginName, password) {
        const user = await this.usersRepository.findOne({
            where: {
                loginName,
                password,
            },
        });
        return user || null;
    }
    async findByToken(token) {
        if (!token)
            return null;
        const user = await this.usersRepository.findOne({ where: { token } });
        return user || null;
    }
    async update(uid, updateUserDto) {
        await this.usersRepository.update({ uid }, updateUserDto);
        return this.findOne(uid);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map