import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { CodesService } from '../codes/codes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]), // Register Group schema
  ],
  controllers: [GroupsController],
  providers: [GroupsService, CodesService],
})
export class GroupsModule {}
