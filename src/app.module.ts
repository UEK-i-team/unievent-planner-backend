import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConnectionString } from './libs';
import { GroupsService } from './groups/groups.service';
import { GroupsController } from './groups/groups.controller';
import { Group, GroupSchema, UserAccount, UserAccountSchema } from './models';

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
    MongooseModule.forFeature([
      { name: UserAccount.name, schema: UserAccountSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class AppModule {}
