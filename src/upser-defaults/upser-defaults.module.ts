import { Module } from '@nestjs/common';
import { UpserDefaultsService } from './upser-defaults.service';

@Module({
  providers: [UpserDefaultsService],
})
export class UpserDefaultsModule {}
