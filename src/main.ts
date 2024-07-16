import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './libs';
import { WinstonModule } from 'nest-winston';
import { WinstonLogger } from 'src/libs/internal/winston.logger';

async function bootstrap(): Promise<void> {
  dotenv.config(); 

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: WinstonLogger,
    }),
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(`${process.env.HOST_PORT}`);

  WinstonLogger.info(
    `Server running on: http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`,
  );
}
bootstrap();
