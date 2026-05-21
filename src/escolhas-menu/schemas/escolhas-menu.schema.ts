import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EscolhasMenuDocument = HydratedDocument<EscolhasMenu>;

@Schema({
  timestamps: true,
  collection: 'escolhas_menu',
})
export class EscolhasMenu {
  @Prop({
    type: Types.ObjectId,
    ref: 'EventoOrcamento',
    required: true,
  })
  idEvento!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'PratoCardapio',
    required: true,
  })
  idPrato!: Types.ObjectId;

  @Prop({
    required: true,
    maxlength: 50,
  })
  tipoEscolha!: string;
}

export const EscolhasMenuSchema = SchemaFactory.createForClass(EscolhasMenu);