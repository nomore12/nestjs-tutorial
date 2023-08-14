import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

dotenv.config();

import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.DATABASE_USERNAME);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
