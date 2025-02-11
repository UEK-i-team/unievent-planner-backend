import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionGuard } from './libs';
import { MongooseModels } from './models';
import { UpserDefaultsService } from './upser-defaults/upser-defaults.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = `mongodb://${configService.get<string>('MONGODB_HOST')}:${configService.get<string>('MONGODB_PORT')}/${configService.get<string>('MONGODB_DATABASE')}`;
        return { uri };
      },
    }),
    MongooseModule.forFeature(MongooseModels),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    UpserDefaultsService,
    Logger,
  ],
})
export class AppModule {}
