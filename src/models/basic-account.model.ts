import { Prop } from '@nestjs/mongoose';
import { BasicClass } from './basic.model';

export abstract class BasicAccount extends BasicClass {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, readonly: true })
  initials!: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ required: true, default: [], type: [String], ref: 'Role' })
  roles!: string[];

  @Prop({
    required: true,
    type: String,
    ref: 'BasicAccount',
    readonly: true,
    select: false,
  })
  createdBy?: string;

  @Prop({ required: true, type: String, ref: 'BasicAccount' })
  updatedBy!: string;
}
