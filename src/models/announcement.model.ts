import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseClass } from './base-class.model';
import { AnnouncementTargetType } from 'src/libs/shared';

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

  @Prop({ required: true, enum: AnnouncementTargetType })
  targetType!: AnnouncementTargetType;

  @Prop({ required: false, type: [String], select: false }) // Optional target value (array)
  targetValue?: string[];

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

  @Prop({ required: false })
  expiresAt?: Date;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
