import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PratoCardapioDocument = HydratedDocument<PratoCardapio>;

export enum CategoriaPrato {
  COLD_STARTER = 'coldStarter',
  HOT_STARTER = 'hotStarter',
  MAIN_COURSE = 'mainCourse',
  DESSERT = 'dessert',
}

export enum PerfilAlimentar {
  VEGETARIANO = 'vegetariano',
  VEGANO = 'vegano',
  SEM_GLUTEN = 'semGluten',
  SEM_LACTOSE = 'semLactose',
  PROTEINA_ANIMAL = 'proteinaAnimal',
}

export enum EstiloCulinario {
  ITALIANO = 'italiano',
  FRANCES = 'frances',
  BRASILEIRO = 'brasileiro',
  JAPONES = 'japones',
  MEXICANO = 'mexicano',
  FUSION = 'fusion',
  CONTEMPORANEO = 'contemporaneo',
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
    enum: Object.values(PerfilAlimentar),
    default: [],
  })
  perfilAlimentar!: string[];

  @Prop({
    required: false,
    type: [String],
    enum: Object.values(EstiloCulinario),
    default: [],
  })
  estilo!: string[];

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  imagem?: string;

  @Prop({
    required: false,
    type: Number,
    default: 0,
    min: 0,
  })
  custoAdicional!: number;

  @Prop({
    required: false,
    type: Boolean,
    default: false,
  })
  pratoDestaque!: boolean;

  @Prop({
    required: false,
    type: Boolean,
    default: true,
  })
  status!: boolean;

  @Prop({
    required: false,
    type: Date,
  })
  createdAt?: Date;

  @Prop({
    required: false,
    type: Date,
  })
  updatedAt?: Date;
}

export const PratoCardapioSchema = SchemaFactory.createForClass(PratoCardapio);
