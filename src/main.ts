import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './libs';
import { WinstonModule } from 'nest-winston';
import { WinstonLogger } from 'src/libs/internal/winston.logger';
import * as session from 'express-session';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: WinstonLogger,
    }),
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      },
    }),
  );
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS || 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: process.env.CORS_HEADERS || 'Content-Type,Authorization',
    credentials: process.env.CORS_CREDENTIALS === 'true',
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
