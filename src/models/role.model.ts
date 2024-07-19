import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseClass } from './base.model';
import { Action, FieldConstraints, Subject } from 'src/libs/shared';

export type AppPermissionsDocument = AppPermissions & Document;
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

export type RoleDocument = Role & Document;

@Schema()
export class Role extends BaseClass {
  @Prop({
    required: true,
    lowercase: true,
    maxlength: FieldConstraints.CODE.MAX_LENGTH,
    match: FieldConstraints.CODE.PATTERN,
  })
  code!: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: FieldConstraints.NAME.MAX_LENGTH,
  })
  name!: string;

  @Prop({
    required: true,
    default: [],
    type: [AppPermissions],
    select: false,
  })
  permissions!: AppPermissions[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
