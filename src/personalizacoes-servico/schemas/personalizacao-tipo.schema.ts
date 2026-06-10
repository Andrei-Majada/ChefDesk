import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PersonalizacaoTipoDocument = HydratedDocument<PersonalizacaoTipo>;

@Schema({ timestamps: true })
export class PersonalizacaoTipo {
  @Prop({
    required: true,
    type: String,
    trim: true,
    unique: true,
  })
  nome!: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  descricao?: string;

  @Prop({
    required: true,
    type: Number,
    default: 0,
    min: 0,
  })
  valorEvento!: number;

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

export const PersonalizacaoTipoSchema =
  SchemaFactory.createForClass(PersonalizacaoTipo);
