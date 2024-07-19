import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseClass } from './base.model';
import { AnnouncementTargetType } from 'src/libs/shared';

export type AnnouncementTargetDocument = AnnouncementTarget & Document;
export class AnnouncementTarget {
  @Prop({
    required: true,
    lowercase: true,
    trim: true,
    enum: AnnouncementTargetType,
  })
  type!: AnnouncementTargetType;

  @Prop({ default: [], required: true, type: [String], select: false })
  value!: string[];
}

export const AnnouncementTargetSchema =
  SchemaFactory.createForClass(AnnouncementTarget);

export type AnnouncementDocument = Announcement & Document;

@Schema()
export class Announcement extends BaseClass {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  endDate!: Date;

  @Prop({ required: true })
  target: AnnouncementTarget;

  @Prop({ required: false })
  expiresAt?: Date;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
