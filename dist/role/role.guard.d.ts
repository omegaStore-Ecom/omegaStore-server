import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class RolesGuard implements CanActivate {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<any>;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const Roles: (...roles: string[]) => import("@nestjs/common").CustomDecorator<string>;
