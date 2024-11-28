import { Module } from '@nestjs/common';
import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './service/groups.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModels } from 'src/models';
import { CodeModule } from '../join-codes/codes.module';
import { UpserDefaultsService } from '../../upser-defaults/upser-defaults.service';

@Module({
  imports: [MongooseModule.forFeature(MongooseModels), CodeModule],
  controllers: [GroupsController],
  providers: [GroupsService, CodeModule, UpserDefaultsService],
})
export class GroupsModule {}
