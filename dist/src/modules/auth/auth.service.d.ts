import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { GithubLoginDto } from './dto/github-login.dto';
export declare class AuthService {
    private usersService;
    private configService;
    private httpService;
    constructor(usersService: UsersService, configService: ConfigService, httpService: HttpService);
    validateUser(loginName: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        token: any;
        user: any;
    }>;
    githubLogin(githubLoginDto: GithubLoginDto): Promise<{
        token: string;
        user: {
            uid: number;
            provider: string;
            loginName: string;
            username: string;
            token: string;
            avatarUrl: string;
            location: string;
            bio: string;
            email: string;
            ipAddr: string;
            role: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
