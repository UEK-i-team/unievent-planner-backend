import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FieldConstraints } from 'src/libs';
import { BaseClass } from './base.model';

export type AnnouncementDocument = Announcement & Document;

@Schema()
export class Announcement extends BaseClass {
  @Prop({
    required: true,
    trim: true,
    maxlength: FieldConstraints.TITLE.MAX_LENGTH,
  })
  title!: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: FieldConstraints.DESCRIPTION.MAX_LENGTH,
  })
  description!: string;

  // TODO implement later, when permissions are WORKING
  // @Prop({ required: true, enum: AnnouncementTargetType })
  // targetType!: AnnouncementTargetType;

  // @Prop({ required: false, type: [String], select: false })
  // targetValue?: string[];

  @Prop({ required: false, select: false })
  expiresAt?: Date;

  @Prop({ required: true })
  important!: boolean;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
