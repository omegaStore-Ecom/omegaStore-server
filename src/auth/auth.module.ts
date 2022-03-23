import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admins/admin.module';
import { AtStrategy } from './Local.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [AdminModule],
  providers: [AuthService, AtStrategy, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
