import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { instance } from 'logger/winston.logger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });
  await app.listen(`${process.env.HOST_PORT}`);

  instance.info(
    `Server running on: http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`,
  );
}
bootstrap();
