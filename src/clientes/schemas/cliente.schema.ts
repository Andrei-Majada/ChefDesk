import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClienteDocument = HydratedDocument<Cliente>;

@Schema({ timestamps: true })
export class Cliente {
  @Prop({
    required: true,
    type: String,
    maxlength: 150,
    trim: true,
  })
  nome!: string;

  @Prop({
    required: true,
    type: String,
    maxlength: 20,
    trim: true,
  })
  whatsapp!: string;

  @Prop({
    required: false,
    type: String,
    maxlength: 150,
    trim: true,
    lowercase: true,
  })
  email?: string;

  @Prop({
    required: false,
    type: String,
    maxlength: 10,
    trim: true,
  })
  cep?: string;

  @Prop({
    required: false,
    type: String,
    maxlength: 255,
    trim: true,
  })
  endereco?: string;
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
