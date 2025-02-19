import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConnectionString, PermissionGuard } from './libs';
import { MongooseModels } from './models';
import { UpserDefaultsService } from './upser-defaults/upser-defaults.service';
import { AnnouncementsService } from './core/announcements/services/announcements.service';
import { AccountsService } from './core/accounts/services/accounts.service';
import { EventsService } from './core/events/services/events.service';
import { GroupsService } from './core/groups/services/groups.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: getMongoConnectionString(configService),
      }),
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
    AnnouncementsService,
    AccountsService,
    EventsService,
    GroupsService,
  ],
})
export class AppModule {}
