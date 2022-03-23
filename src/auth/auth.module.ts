import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  // imports: [
  //   PassportModule.register({
  //     defaultStrategy: 'jwt',
  //     property: 'user',
  //     session: false,
  //   }),
  // ],
  controllers: [AuthController],
  providers: [AuthService],
  // exports: [PassportModule],
})
export class AuthModule {}
