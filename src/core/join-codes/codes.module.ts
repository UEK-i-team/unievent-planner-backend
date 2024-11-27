import { Module } from '@nestjs/common';
import { codeService } from './service/code.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { MongooseModels } from 'src/models';

@Module({
  imports: [MongooseModule.forFeature(MongooseModels)],
  providers: [codeService],
  exports: [codeService],
})
export class CodeModule {}
