import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admins/admin.module';

@Module({
  imports: [AdminModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
