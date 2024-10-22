import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseClass } from './base.model';

export type JoinCodeDocument = JoinCode & Document;

@Schema()
export class JoinCode extends BaseClass {
  @Prop({ required: true, type: String, ref: 'Role' })
  role!: string;

  @Prop({ required: true, type: String, ref: 'Group' })
  group!: string;

  //how many times code was used
  @Prop({ required: true, default: 0, select: false })
  uses!: number;

  @Prop({ required: false, select: false })
  usesLeft?: number;

  @Prop({ required: false, select: false })
  expiresAt?: Date;
}

export const JoinCodeSchema = SchemaFactory.createForClass(JoinCode);
