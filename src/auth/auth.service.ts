import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AdminService } from 'src/admins/admin.service';
@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async signPayload(payload: any) {
    return sign(payload, 'secret', { expiresIn: '7d' });
  }
}
