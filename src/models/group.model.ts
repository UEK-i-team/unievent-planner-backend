import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { FieldConstraints, VerificationStatus } from 'src/libs';
import { BaseClass } from './base.model';

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

  @Prop({ required: false, trim: true })
  courseName?: string;

  @Prop({
    required: false,
    trim: true,
    maxlength: FieldConstraints.DESCRIPTION.MAX_LENGTH,
  }) // Optional description
  description?: string;

  @Prop({
    default: VerificationStatus.PENDING,
    required: true,
    enum: VerificationStatus,
  })
  verificationStatus!: VerificationStatus;

  @Prop({ required: false, trim: true })
  rejectionReason?: string;

  @Prop({ required: true, type: String, ref: 'User' })
  president!: string;

  @Prop({
    required: true,
    default: [],
    type: [String],
    select: false,
    ref: 'JoinCode',
  })
  joinCodes!: string[];

  @Prop({
    required: true,
    default: [],
    type: [String],
    ref: 'User',
    select: false,
  })
  members!: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
