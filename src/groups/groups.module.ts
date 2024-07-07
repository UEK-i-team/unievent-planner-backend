import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { CodesService } from '../codes/codes.service';

@Module({
  imports: [],
  controllers: [GroupsController],
  providers: [GroupsService, CodesService],
})
export class GroupsModule {}
