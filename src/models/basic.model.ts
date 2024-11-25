import { Prop } from '@nestjs/mongoose';
import { SystemStatus } from 'src/libs/shared';
import * as uuid from 'uuid';

export abstract class BasicClass {
  @Prop({ required: true, default: SystemStatus.ACTIVE, enum: SystemStatus })
  status!: SystemStatus;

  @Prop({ required: true, default: Date.now, readonly: true })
  createdAt!: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt!: Date;
}
