import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import {  EventType, GroupStatus } from '../libs/enums.module'; 

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Group' })
  groups: ObjectId[];

  @Prop({ enum: EventType })
  type: EventType;

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
