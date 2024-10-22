import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FieldConstraints } from 'src/libs';
import { BaseClass } from './base.model';

export type UserDocument = UserAccount & Document;

@Schema()
export class UserAccount extends BaseClass {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    sparse: true,
    maxlength: FieldConstraints.USERNAME.MAX_LENGTH,
  })
  username!: string;

  @Prop({
    required: false,
    maxlength: FieldConstraints.FIRST_NAME.MAX_LENGTH,
  })
  firstName?: string;

  @Prop({
    required: false,
    maxlength: FieldConstraints.LAST_NAME.MAX_LENGTH,
  })
  lastName?: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true, default: [], type: [String], ref: 'Role' })
  role!: string[];

  @Prop({ required: true, default: [], type: [String], ref: 'Group' })
  groups!: string[];
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);
