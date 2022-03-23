import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminService } from 'src/admin/Admin.service';
import { AdminModule } from 'src/admin/Admin.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [AdminModule],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
