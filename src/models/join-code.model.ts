import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseClass } from './base-class.model';

export type JoinCodeDocument = JoinCode & Document;

@Schema()
export class JoinCode extends BaseClass {
  @Prop({
    required: true,
    type: String,
    ref: 'User',
    readonly: true,
    select: false,
  })
  createdBy!: string;

  @Prop({ required: true, type: String, ref: 'User' })
  updatedBy!: string;

  @Prop({ required: true, type: String, ref: 'Role' })
  role!: string;

  @Prop({ required: true, type: String, ref: 'Group' })
  group!: string;

  @Prop({ required: true, default: 0, select: false })
  uses!: number;

  @Prop({ required: false, select: false })
  usesLeft?: number;

  @Prop({ required: false, select: false })
  expiresAt?: Date;
}

export const JoinCodeSchema = SchemaFactory.createForClass(JoinCode);
