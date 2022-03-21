import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from './../admin/Admin.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: AdminService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUserCredentials(email: string, password: string): Promise<any> {
    const admin = await this.usersService.findOne(email);

    if (admin && admin.password === password) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

  async loginWithCredentials(admin: any) {
    const payload = { email: admin.email, role: admin.role };

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
