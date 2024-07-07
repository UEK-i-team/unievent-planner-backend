import { Module } from '@nestjs/common';
import { MockController } from './mock.controller';

@Module({
  imports: [],
  controllers: [MockController],
  providers: [],
})
export class AppModule {}
