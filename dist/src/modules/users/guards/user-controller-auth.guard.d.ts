import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
export declare class UserControllerAuthGuard implements CanActivate {
    private moduleRef;
    private usersService;
    constructor(moduleRef: ModuleRef);
    onModuleInit(): Promise<void>;
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
