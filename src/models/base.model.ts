import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BasicClass } from './basic.model';

export abstract class BaseClass extends BasicClass {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BasicAccount',
    readonly: true,
    select: false,
  })
  createdBy?: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BasicAccount',
  })
  updatedBy!: mongoose.Types.ObjectId;
}
