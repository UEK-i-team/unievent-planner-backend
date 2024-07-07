import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseModels } from './models';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [GroupsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
