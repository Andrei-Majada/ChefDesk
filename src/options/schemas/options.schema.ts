import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type OptionsDocument = HydratedDocument<Options>;

class Pricing {
  @Prop({ required: false, type: Number })
  perPerson?: number;

  @Prop({ required: false, type: Number })
  waiterPer?: number;

  @Prop({ required: false, type: Number })
  waiterCostPer?: number;

  @Prop({ required: false, type: Number })
  decorationCost?: number;

  @Prop({ required: false, type: Number })
  proteinUpgradePer?: number;

  @Prop({ required: false, type: Number })
  duplicateDishPer?: number;

  @Prop({ required: false, type: Number })
  additionalTimePer?: number;
}

@Schema({ timestamps: true })
export class Options {
  @Prop({ required: true, type: [String], default: [] })
  kitchenOptions!: string[];

  @Prop({ required: true, type: [String], default: [] })
  restrictionOptions!: string[];

  @Prop({ required: true, type: [String], default: [] })
  locationTypes!: string[];

  @Prop({ required: true, type: [String], default: [] })
  occasions!: string[];

  @Prop({ required: true, type: [String], default: [] })
  upsellOptions!: string[];

  @Prop({ required: true, type: SchemaTypes.Mixed, default: {} })
  pricing!: Pricing;
}

export const OptionsSchema = SchemaFactory.createForClass(Options);
