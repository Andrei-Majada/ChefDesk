import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriaMenuDocument = HydratedDocument<CategoriaMenu>;

@Schema({
  timestamps: true,
  collection: 'categorias_menu',
})
export class CategoriaMenu {
  @Prop({
    required: true,
    maxlength: 50,
    trim: true,
  })
  nome!: string;

  @Prop({
    required: true,
    min: 1,
  })
  ordemExibicao!: number;

  @Prop({
    default: true,
  })
  status!: boolean;
}

export const CategoriaMenuSchema = SchemaFactory.createForClass(CategoriaMenu);
