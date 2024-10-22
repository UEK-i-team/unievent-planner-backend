import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EventType, FieldConstraints } from 'src/libs';
import { BaseClass } from './base.model';

export type EventDocument = Event & Document;

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
    type: [String],
    ref: 'Group',
    select: false,
  })
  groups!: string[];

  @Prop({ required: true, enum: EventType })
  type!: EventType;
}

export const EventSchema = SchemaFactory.createForClass(Event);
