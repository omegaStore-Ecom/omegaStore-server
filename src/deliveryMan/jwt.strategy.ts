import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { DeliveryMenService } from './deliveryMan.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private deliveryManService: DeliveryMenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  // async validate(payload: any, done: VerifiedCallback) {
  //   const Admin = await this.deliveryManService.validateAdmin(payload);
  //   if (!Admin) {
  //     return done(
  //       new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
  //       false,
  //     );
  //   }

  // return done(null, Admin, payload.iat);

  // }

   validate(payload: any) {
    return payload;
  }
}
