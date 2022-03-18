import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './Customer/customer.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://redroot:pwd1234@omegastore.lqtg0.mongodb.net/omegastore?retryWrites=true&w=majority',
    ),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
