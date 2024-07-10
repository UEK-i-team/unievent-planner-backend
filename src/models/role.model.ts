import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseClass } from './base-class.model';
import { FieldConstraints } from 'src/libs/shared';

export type RoleDocument = Role & Document;

@Schema()
export class Role extends BaseClass {
  @Prop({
    required: true,
    lowercase: true,
    maxlength: FieldConstraints.MAX_CODE_LENGTH,
    match: FieldConstraints.CODE_PATTERN,
  })
  code!: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: FieldConstraints.MAX_NAME_LENGTH,
  })
  name!: string;

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

  @Prop({
    required: true,
    default: [],
    type: String,
    ref: 'AppPermissions',
    select: false,
  })
  permissions!: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
