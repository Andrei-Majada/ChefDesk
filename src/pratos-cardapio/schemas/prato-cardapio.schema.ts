import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PratoCardapioDocument = HydratedDocument<PratoCardapio>;

export enum CategoriaPrato {
  COLD_STARTER = 'coldStarter',
  HOT_STARTER = 'hotStarter',
  MAIN_COURSE = 'mainCourse',
  DESSERT = 'dessert',
}

@Schema({ timestamps: true })
export class PratoCardapio {
  @Prop({
    required: true,
    type: String,
    maxlength: 100,
    trim: true,
  })
  nome!: string;

  @Prop({
    required: true,
    type: String,
    unique: true,
    trim: true,
  })
  slug!: string;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(CategoriaPrato),
  })
  categoria!: CategoriaPrato;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  descricao?: string;

  @Prop({
    required: false,
    type: [String],
    default: [],
  })
  tags!: string[];

  @Prop({
    required: false,
    type: Boolean,
    default: true,
  })
  status!: boolean;
}

export const PratoCardapioSchema = SchemaFactory.createForClass(PratoCardapio);
