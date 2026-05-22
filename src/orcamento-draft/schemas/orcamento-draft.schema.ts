import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type OrcamentoDraftDocument = HydratedDocument<OrcamentoDraft>;

export enum StatusDraft {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
}

@Schema({ timestamps: true })
export class OrcamentoDraft {
  @Prop({
    required: true,
    type: Number,
    default: 1,
  })
  currentStep!: number;

  @Prop({
    required: true,
    type: Number,
    default: 24,
  })
  totalScreens!: number;

  @Prop({
    required: true,
    type: Boolean,
    default: false,
  })
  isNextEnabled!: boolean;

  @Prop({
    required: false,
    type: SchemaTypes.Mixed,
    default: {},
  })
  data!: Record<string, any>;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(StatusDraft),
    default: StatusDraft.IN_PROGRESS,
  })
  status!: StatusDraft;
}

export const OrcamentoDraftSchema =
  SchemaFactory.createForClass(OrcamentoDraft);
