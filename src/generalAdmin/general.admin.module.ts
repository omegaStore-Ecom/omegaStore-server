import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneralAdminController } from './general.admin.controller';
import { JwtStrategy } from './jwt.strategy';
import { GeneralAdminService } from 'src/generalAdmin/general.admin.service';
import { GeneralAdminSchema } from 'src/models/general.admin';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'GeneralAdmin', schema: GeneralAdminSchema },
    ]),
  ],
  providers: [GeneralAdminService, JwtStrategy],
  controllers: [GeneralAdminController],
  // exports: [GeneralAdminService],
})
export class GeneralAdminModule {}
