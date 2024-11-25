import { Prop } from '@nestjs/mongoose';
import { SystemStatus } from 'src/libs/shared';
import * as uuid from 'uuid';

export abstract class BasicClass {
  @Prop({ default: () => uuid.v4(), readonly: true, select: false })
  _id!: string;

  get id(): string {
    return this._id;
  }

  @Prop({ required: true, default: SystemStatus.ACTIVE, enum: SystemStatus })
  status!: SystemStatus;

  @Prop({ required: true, default: Date.now, readonly: true })
  createdAt!: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt!: Date;
}
