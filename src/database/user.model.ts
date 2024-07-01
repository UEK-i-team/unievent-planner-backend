import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import {  UserStatus } from '../libs/enums.module'; 

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  avatarUrl: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ enum: UserStatus })
  status: UserStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Group' })
  groups: ObjectId[];

  @Prop({ default: Date.now, readonly: true })
  createdAt: Date;

  @Prop({ default: Date.now, readonly: true })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', readonly: true })
  createdBy: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', readonly: true })
  updatedBy: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
