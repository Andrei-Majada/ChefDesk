import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id?: Types.ObjectId;

  @Prop({
    required: true,
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  })
  username!: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email!: string;

  @Prop({
    required: true,
    type: String,
  })
  password!: string;

  @Prop({
    required: true,
    type: Boolean,
    default: true,
  })
  isAdmin!: boolean;

  @Prop({
    required: false,
    type: Boolean,
    default: true,
  })
  isActive?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
