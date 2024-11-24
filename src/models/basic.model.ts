import { Prop } from '@nestjs/mongoose';
import { SystemStatus } from '../libs';
import { SystemStatus } from '../libs';

export abstract class BasicClass {
  _id!: string;

  @Prop({ required: true, default: SystemStatus.ACTIVE, enum: SystemStatus })
  status!: SystemStatus;

  @Prop({ required: true, default: Date.now, readonly: true })
  createdAt!: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt!: Date;
}
