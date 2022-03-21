import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admins/admin.module';

@Module({
  imports: [AdminModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
