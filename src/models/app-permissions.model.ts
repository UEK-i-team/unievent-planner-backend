import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Action, FieldConstraints, Subject } from 'src/libs';

@Schema()
export class AppPermissions {
  @Prop({
    required: true,
    lowercase: true,
    trim: true,
    enum: Action,
    maxlength: FieldConstraints.ACTION.MAX_LENGTH,
  })
  action!: Action;

  @Prop({
    required: true,
    lowercase: true,
    trim: true,
    enum: Subject,
    maxlength: FieldConstraints.SUBJECT.MAX_LENGTH,
  })
  subject!: Subject;
}

export const AppPermissionsSchema =
  SchemaFactory.createForClass(AppPermissions);
