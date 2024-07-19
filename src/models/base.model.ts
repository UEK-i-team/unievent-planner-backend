import { Prop } from '@nestjs/mongoose';
import { BasicClass } from './basic.model';

export abstract class BaseClass extends BasicClass {
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
