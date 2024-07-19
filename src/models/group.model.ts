import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { BaseClass } from './base.model';
import { FieldConstraints, VerificationStatus } from 'src/libs/shared';

export type GroupDocument = Group & Document;

@Schema()
export class Group extends BaseClass {
  @Prop({
    required: true,
    lowercase: true,
    match: FieldConstraints.CODE.PATTERN,
  })
  code!: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: FieldConstraints.NAME.MAX_LENGTH,
  })
  name!: string;

  @Prop({ required: true })
  avatarUrl!: string;

  @Prop({ required: false })
  courseName?: string;

  @Prop({ required: false })
  description?: string;

  @Prop({
    default: VerificationStatus.PENDING,
    required: true,
    enum: VerificationStatus,
  })
  verificationStatus!: VerificationStatus;

  @Prop({ required: false })
  rejectionReason?: string;

  @Prop({ required: true, type: String, ref: 'UserAccount' })
  president!: string;

  @Prop({
    default: [],
    required: true,
    type: [String],
    select: false,
    ref: 'JoinCode',
  })
  codes!: string[];

  @Prop({
    required: true,
    default: [],
    type: [String],
    ref: 'UserAccount',
    select: false,
  })
  members!: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
