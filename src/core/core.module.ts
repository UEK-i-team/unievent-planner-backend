import { Module } from '@nestjs/common';
import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';
import { CodesService } from './services/codes.service';

@Module({
  imports: [],
  controllers: [GroupsController],
  providers: [GroupsService, CodesService],
})
export class CoreModule {}
