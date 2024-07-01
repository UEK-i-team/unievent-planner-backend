import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import {  GroupStatus, VerificationStatus } from '../libs/enums.module'; 

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  avatarUrl: string;

  @Prop() // Optional course name
  courseName?: string;

  @Prop() // Optional description
  description?: string;

  @Prop({ enum: GroupStatus })
  status: GroupStatus;

  @Prop({ enum: VerificationStatus })
  verificationStatus: VerificationStatus;

  @Prop() // Optional rejection reason
  rejectionReason?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  president: ObjectId;

  @Prop({ type: [String] })
  codes: string[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  members: ObjectId[];

  @Prop({ default: Date.now, readonly: true })
  createdAt: Date;

  @Prop({ default: Date.now, readonly: true })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', readonly: true })
  createdBy: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', readonly: true })
  updatedBy: ObjectId;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
