import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UUIDSchemaType } from '../libs/internal/uuid.type'; // Ensure this path is correct
import { SystemStatus } from 'src/libs';

export abstract class BasicClass {
  @Prop({ required: true, default: SystemStatus.ACTIVE, enum: SystemStatus })
  status!: SystemStatus;

  @Prop({ required: true, default: Date.now, readonly: true })
  createdAt!: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt!: Date;
}
