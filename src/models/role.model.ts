import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FieldConstraints } from 'src/libs';
import { BaseClass } from './base.model';

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
    type: String,
    ref: 'AppPermissions',
    select: false,
  })
  permissions!: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
