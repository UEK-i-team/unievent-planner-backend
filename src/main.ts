import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './libs';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(`${process.env.HOST_PORT}`);

  const logger = new Logger('Bootstrap');
  logger.log(
    `Server running on: http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`,
  );
}
bootstrap();
