import { Module } from '@nestjs/common';
import { AdminService } from './Admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from '../models/Admin.schema';

import { AdminController } from './admin.controller';
@Module({
  imports: [
  MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
   
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],

})
export class AdminModule {}
