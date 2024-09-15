import { ConfigService } from '@nestjs/config';

export function getMongoConnectionString(configService: ConfigService): string {
  const host = configService.get<string>('MONGODB_HOST');
  const port = configService.get<string>('MONGODB_PORT');
  const database = configService.get<string>('MONGODB_DATABASE');
  const user = configService.get<string>('MONGODB_USER');
  const password = configService.get<string>('MONGODB_PASSWORD');

  return user && password
    ? `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin`
    : `mongodb://${host}:${port}/${database}`;
}
