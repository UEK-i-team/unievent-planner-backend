import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { BaseClass } from './base-class.model';
import { FieldConstraints, VerificationStatus } from 'src/libs/shared';

export type GroupDocument = Group & Document;

@Schema()
export class Group extends BaseClass {
  @Prop({
    required: true,
    lowercase: true,
    match: FieldConstraints.CODE_PATTERN,
  })
  code!: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: FieldConstraints.MAX_NAME_LENGTH,
  })
  name!: string;

  @Prop({ required: true })
  avatarUrl!: string;

  @Prop({ required: false }) // Optional course name
  courseName?: string;

  @Prop({ required: false }) // Optional description
  description?: string;

  @Prop({
    default: VerificationStatus.PENDING,
    required: true,
    enum: VerificationStatus,
  })
  verificationStatus!: VerificationStatus;

  @Prop({ required: false }) // Optional rejection reason
  rejectionReason?: string;

  @Prop({ required: true, type: String, ref: 'User' })
  president!: string;

  @Prop({ required: true, type: [String], select: false })
  codes!: string[];

  @Prop({
    required: true,
    default: [],
    type: [String],
    ref: 'User',
    select: false,
  })
  members!: string[];

  @Prop({
    required: true,
    type: String,
    ref: 'User',
    readonly: true,
    select: false,
  })
  createdBy!: string;

  @Prop({ required: true, type: String, ref: 'User' })
  updatedBy: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
