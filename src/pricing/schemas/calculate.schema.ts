import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type CalculateDocument = HydratedDocument<Calculate>;

@Schema({ timestamps: true })
export class Calculate {
  @Prop({ required: false, type: Number })
  guests?: number;

  @Prop({ required: false, type: SchemaTypes.Mixed, default: {} })
  event?: Record<string, any>;

  @Prop({ required: false, type: SchemaTypes.Mixed, default: {} })
  upsell?: Record<string, any>;

  @Prop({ required: false, type: Number })
  basePerPerson?: number;

  @Prop({ required: true, type: SchemaTypes.Mixed, default: {} })
  result!: Record<string, any>;
}

export const CalculateSchema = SchemaFactory.createForClass(Calculate);
