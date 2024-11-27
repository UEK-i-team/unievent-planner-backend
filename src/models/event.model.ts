import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EventType, FieldConstraints } from '../libs';
import { BaseClass } from './base.model';

@Schema()
export class Event extends BaseClass {
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

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  endDate!: Date;

  @Prop({
    required: true,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Group',
    select: false,
  })
  groups!: string[];

  @Prop({ required: true, enum: EventType })
  type!: EventType;
}

export const EventSchema = SchemaFactory.createForClass(Event);
