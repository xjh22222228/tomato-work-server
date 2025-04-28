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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
const rxjs_1 = require("rxjs");
const crypto_1 = require("../../utils/crypto");
let AuthService = class AuthService {
    usersService;
    configService;
    httpService;
    constructor(usersService, configService, httpService) {
        this.usersService = usersService;
        this.configService = configService;
        this.httpService = httpService;
    }
    async validateUser(loginName, password) {
        const user = await this.usersService.findByLoginNameAndPassword(loginName, password);
        if (!user) {
            return null;
        }
        const { password: _, ...result } = user;
        return result;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.loginName, loginDto.password);
        if (!user) {
            throw new common_1.HttpException('用户名或密码错误', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const { password: _, ...result } = user;
        return {
            token: user.token,
            user: {
                ...result,
                token: user.token,
            },
        };
    }
    async githubLogin(githubLoginDto) {
        try {
            const clientId = this.configService.get('GITHUB_CLIENT_ID');
            const clientSecret = this.configService.get('GITHUB_CLIENT_SECRET');
            if (!clientId || !clientSecret) {
                throw new common_1.HttpException('GitHub配置缺失', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const tokenResponse = await (0, rxjs_1.lastValueFrom)(this.httpService.post('https://github.com/login/oauth/access_token', {
                client_id: clientId,
                client_secret: clientSecret,
                code: githubLoginDto.code,
            }, {
                headers: { Accept: 'application/json' },
            }));
            const accessToken = tokenResponse.data.access_token;
            if (!accessToken) {
                throw new common_1.HttpException('获取GitHub Token失败', common_1.HttpStatus.BAD_REQUEST);
            }
            const userResponse = await (0, rxjs_1.lastValueFrom)(this.httpService.get('https://api.github.com/user', {
                headers: {
                    Authorization: `token ${accessToken}`,
                    Accept: 'application/json',
                },
            }));
            const githubUser = userResponse.data;
            const defaultPassword = (0, crypto_1.md5)('123456');
            const userInfo = {
                uid: Number(githubUser.id),
                provider: 'github',
                loginName: githubUser.login,
                username: githubUser.name || githubUser.login,
                token: accessToken,
                avatarUrl: githubUser.avatar_url,
                location: githubUser.location,
                bio: githubUser.bio,
                email: githubUser.email,
                password: defaultPassword,
            };
            let user = await this.usersService.findOne(userInfo.uid);
            if (!user) {
                const foundUser = await this.usersService.findByLoginName(userInfo.loginName);
                if (foundUser) {
                    user = foundUser;
                }
            }
            if (user) {
                const { password, ...updateInfo } = userInfo;
                user = await this.usersService.update(user.uid, {
                    ...updateInfo,
                    token: accessToken,
                });
            }
            else {
                user = await this.usersService.create(userInfo);
            }
            const { password: _, ...result } = user;
            return {
                token: accessToken,
                user: result,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'GitHub登录失败', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService,
        axios_1.HttpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map