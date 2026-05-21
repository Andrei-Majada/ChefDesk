import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PratoCardapioDocument = HydratedDocument<PratoCardapio>;

@Schema({
  timestamps: true,
  collection: 'pratos_cardapio',
})
export class PratoCardapio {
  @Prop({
    required: true,
    maxlength: 100,
  })
  nome!: string;

  @Prop({
    required: true,
    maxlength: 50,
    index: true,
  })
  categoria!: string;

  @Prop()
  descricao?: string;

  @Prop()
  imagem?: string;

  @Prop({
    required: true,
    min: 0,
  })
  preco!: number;

  @Prop({
    default: false,
  })
  recomendacaoChef!: boolean;

  @Prop({
    default: true,
  })
  status!: boolean;

  @Prop({
    default: false,
  })
  especialidadeEstrelada!: boolean;
}

export const PratoCardapioSchema = SchemaFactory.createForClass(PratoCardapio);
