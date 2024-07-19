import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseClass } from './base.model';
import { FieldConstraints } from 'src/libs/shared';

export type JoinCodeDocument = JoinCode & Document;

@Schema({ _id: false })
export class JoinCode extends BaseClass {
  @Prop({
    required: true,
    type: String,
    unique: true,
    match: FieldConstraints.CONTENT.PATTERN,
  })
  content!: string;

  @Prop({ required: true, type: String, ref: 'Role' })
  role!: string;

  @Prop({ required: true, type: String, ref: 'Group' })
  group!: string;

  @Prop({ required: true, default: 0, select: false })
  uses!: number;

  @Prop({ required: false, select: false })
  usesLeft?: number;

  @Prop({ required: false, select: false })
  expiresAt?: Date;
}

export const JoinCodeSchema = SchemaFactory.createForClass(JoinCode);

JoinCodeSchema.virtual('_id').get(function () {
  return this.content;
});
