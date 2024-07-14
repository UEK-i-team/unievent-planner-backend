import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModels } from './models';
import { GroupsModule } from './groups/groups.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
