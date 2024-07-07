import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EventType } from 'src/libs/shared';
import { BaseClass } from './base-class.model';

export type EventDocument = Event & Document;

@Schema()
export class Event extends BaseClass {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  endDate!: Date;

  @Prop({ required: true })
  startTime!: string;

  @Prop({ required: true })
  endTime!: string;

  @Prop({ required: true, type: [String], ref: 'Group', select: false })
  groups!: string[];

  @Prop({ required: true, enum: EventType })
  type!: EventType;

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

  @Prop({ required: true, type: String, ref: 'Role' })
  role!: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);