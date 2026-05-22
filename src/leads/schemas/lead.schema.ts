import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeadDocument = HydratedDocument<Lead>;

@Schema({ timestamps: true })
export class Lead {
  @Prop({ required: true, type: String, trim: true })
  name!: string;

  @Prop({ required: true, type: String, trim: true })
  phone!: string;

  @Prop({ required: true, type: Boolean, default: false })
  lgpdConsent!: boolean;

  @Prop({ required: false, type: String, trim: true })
  source?: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
