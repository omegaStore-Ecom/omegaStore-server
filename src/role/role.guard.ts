import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    // const userType = request.user.role;
    // return roles.some(r => r === userType);

    // const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) throw new UnauthorizedException('Null Access Token');

    const decoded = verify(token, `${process.env.SECRET_KEY}`);
    // req.session = user; //User Session
    /* Some extra validation here */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // return (decoded.role == roles[0]);
    // const user = req.user
    // console.log(decoded.role == roles[0]);
    return decoded?.role == roles[0];

    // return true;
    // console.log(token);
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
