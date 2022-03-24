import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { DeliveryMenService } from 'src/deliveryMan/deliveryMan.service';
import { CustomerService } from './customer.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private deliveryManService: CustomerService) {
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
