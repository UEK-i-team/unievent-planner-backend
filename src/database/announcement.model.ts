import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import {  AnnouncementTargetType, GroupStatus } from '../libs/enums.module';

export type AnnouncementDocument = Announcement & Document;

@Schema()
export class Announcement {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ enum: AnnouncementTargetType })
  targetType: AnnouncementTargetType;

  @Prop({ type: [String] }) // Optional target value (array)
  targetValue?: string[];

  @Prop({ enum: GroupStatus })
  status: GroupStatus;

  @Prop({ default: Date.now, readonly: true })
  createdAt: Date;

  @Prop({ default: Date.now, readonly: true })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', readonly: true })
  createdBy: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', readonly: true })
  updatedBy: ObjectId;

  @Prop()
  expiresAt: Date;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
