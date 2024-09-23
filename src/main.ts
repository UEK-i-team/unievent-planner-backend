import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { WinstonLogger } from 'src/libs/internal/winston.logger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: WinstonLogger,
    }),
  });

  try {
    await app.listen('5304124');
  } catch (Ex) {
    throw Error('huh2');
  }

  await app.listen(`${process.env.HOST_PORT}`);

  WinstonLogger.info(
    `Server running on: http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`,
  );
}
bootstrap();
