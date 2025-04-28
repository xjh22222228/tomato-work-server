import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GithubLoginDto } from './dto/github-login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
