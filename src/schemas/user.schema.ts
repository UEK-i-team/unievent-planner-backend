import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  uid: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  tokens: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
