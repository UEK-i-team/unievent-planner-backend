import { Prop } from '@nestjs/mongoose';
import { SystemStatus } from 'src/libs/shared';
import { v4 as uuid } from 'uuid';

export abstract class BaseClass {
  @Prop({ default: uuid, readonly: true, select: false })
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
