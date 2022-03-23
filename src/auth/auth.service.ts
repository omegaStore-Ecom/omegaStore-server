import { Injectable } from '@nestjs/common';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { AdminService } from 'src/admin/Admin.service';

@Injectable()
export class AuthService {

  constructor(private adminService: AdminService) {}
  
  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
  async validateAdmin(payload: Payload) {
    return await this.adminService.findByPayload(payload);
  }
}
