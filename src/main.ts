import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { RolesGuard } from './role/role.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); 
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
