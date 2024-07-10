import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Action, Subject, FieldConstraints } from 'src/libs/shared';

export type AppPermissionsDocument = AppPermissions & Document;

@Schema()
export class AppPermissions {
  @Prop({
    required: true,
    lowercase: true,
    trim: true,
    enum: Action,
    maxlength: FieldConstraints.MAX_ACTION_LENGTH,
  })
  action!: Action;

  @Prop({
    required: true,
    lowercase: true,
    trim: true,
    enum: Subject,
    maxlength: FieldConstraints.MAX_SUBJECT_LENGTH,
  })
  subject!: Subject;
}

export const AppPermissionsSchema =
  SchemaFactory.createForClass(AppPermissions);
