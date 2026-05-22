import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventoOrcamentoDocument = HydratedDocument<EventoOrcamento>;

export enum StatusOrcamento {
  NOVO = 'novo',
  EM_ANALISE = 'em_analise',
  ENVIADO = 'enviado',
  APROVADO = 'aprovado',
  RECUSADO = 'recusado',
  CANCELADO = 'cancelado',
}

@Schema({ _id: false })
export class ClienteResumo {
  @Prop({ required: true, type: String, trim: true })
  nome!: string;

  @Prop({ required: true, type: String, trim: true })
  whatsapp!: string;

  @Prop({ required: false, type: String, trim: true, lowercase: true })
  email?: string;
}

@Schema({ _id: false })
export class RestricoesAlimentares {
  @Prop({ required: true, type: Boolean, default: false })
  possuiRestricoes!: boolean;

  @Prop({ required: true, type: [String], default: [] })
  itens!: string[];

  @Prop({ required: false, type: String, trim: true })
  observacoes?: string;
}

@Schema({ _id: false })
export class MenuSelecionado {
  @Prop({ required: false, type: String })
  coldStarter?: string;

  @Prop({ required: false, type: String })
  hotStarter?: string;

  @Prop({ required: false, type: String })
  mainCourse?: string;

  @Prop({ required: false, type: String })
  dessert?: string;
}

@Schema({ _id: false })
export class PersonalizacaoServico {
  @Prop({ required: true, type: Boolean, default: false })
  temDecoracao!: boolean;

  @Prop({ required: true, type: Number, default: 1 })
  qtdGarcons!: number;

  @Prop({ required: true, type: Number, default: 0 })
  custoGarcons!: number;

  @Prop({ required: true, type: Boolean, default: false })
  mudouProteina!: boolean;

  @Prop({ required: true, type: Boolean, default: false })
  duplicarPrato!: boolean;

  @Prop({ required: true, type: Boolean, default: false })
  tempoAdicional!: boolean;

  @Prop({ required: false, type: String })
  categoriaDuplicada?: string;
}

@Schema({ timestamps: true })
export class EventoOrcamento {
  @Prop({
    required: true,
    type: ClienteResumo,
  })
  cliente!: ClienteResumo;

  @Prop({
    required: true,
    type: Date,
  })
  dataEvento!: Date;

  @Prop({
    required: false,
    type: String,
  })
  turno?: string;

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  cidade!: string;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  bairro?: string;

  @Prop({
    required: true,
    type: String,
  })
  tipoLocal!: string;

  @Prop({
    required: true,
    type: Number,
  })
  qtdPessoas!: number;

  @Prop({
    required: false,
    type: String,
    trim: true,
  })
  ocasiao?: string;

  @Prop({
    required: true,
    type: [String],
    default: [],
  })
  estruturaCozinha!: string[];

  @Prop({
    required: true,
    type: RestricoesAlimentares,
  })
  restricoesAlimentares!: RestricoesAlimentares;

  @Prop({
    required: true,
    type: MenuSelecionado,
  })
  menu!: MenuSelecionado;

  @Prop({
    required: true,
    type: PersonalizacaoServico,
  })
  personalizacaoServico!: PersonalizacaoServico;

  @Prop({
    required: true,
    type: Number,
  })
  valorEstimadoTotal!: number;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(StatusOrcamento),
    default: StatusOrcamento.NOVO,
  })
  status!: StatusOrcamento;

  @Prop({
    required: true,
    type: String,
    default: 'site',
  })
  origem!: string;
}

export const EventoOrcamentoSchema =
  SchemaFactory.createForClass(EventoOrcamento);
