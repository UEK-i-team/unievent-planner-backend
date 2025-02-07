import { Module } from '@nestjs/common';
import { CodeService } from './service/code.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { MongooseModels } from 'src/models';
import { UpserDefaultsService } from '../../upser-defaults/upser-defaults.service';

@Module({
  imports: [MongooseModule.forFeature(MongooseModels)],
  providers: [CodeService, UpserDefaultsService],
  exports: [CodeService],
})
export class CodeModule {}
