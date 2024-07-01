import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import {  GroupStatus } from '../libs/enums.module'; 

export type JoinCodeDocument = JoinCode & Document;

@Schema()
export class JoinCode {
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  group: ObjectId;

  @Prop({ required: true })
  uses: number;

  @Prop({ required: true })
  usesLeft: number;

  @Prop()
  expiresAt: Date;
}

export const JoinCodeSchema = SchemaFactory.createForClass(JoinCode);
