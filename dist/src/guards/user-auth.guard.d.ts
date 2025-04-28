import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
export declare class UserAuthGuard implements CanActivate {
    private usersService;
    constructor(usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
