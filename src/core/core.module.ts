import { Module } from '@nestjs/common';
import { GroupsController } from './controllers/groups.controller';
import { CodesService } from './services/codes.service';
import { GroupsService } from './services/groups.service';

@Module({
  imports: [],
  controllers: [GroupsController],
  providers: [GroupsService, CodesService],
})
export class CoreModule {}
