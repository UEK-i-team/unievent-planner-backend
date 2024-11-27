import { Module } from '@nestjs/common';
import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './service/groups.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModels } from 'src/models';
import { CodeModule } from '../join-codes/codes.module';

@Module({
  imports: [
    MongooseModule.forFeature(MongooseModels),
    CodeModule, // Register Group schema
  ],
  controllers: [GroupsController],
  providers: [GroupsService, CodeModule],
})
export class GroupsModule {}
