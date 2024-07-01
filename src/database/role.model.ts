import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { RoleStatus } from '../libs/enums.module'; 

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ enum: RoleStatus })
  status: RoleStatus;

  @Prop({ default: Date.now, readonly: true })
  createdAt: Date;

  @Prop({ default: Date.now, readonly: true })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', readonly: true })
  createdBy: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', readonly: true })
  updatedBy: ObjectId;

  @Prop({ type: { akcja: String, subject: String } }) // Dictionary type
  permissions: { akcja: string; subject: string }[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
