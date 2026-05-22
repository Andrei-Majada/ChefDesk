import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEventosOrcamentoDto } from './dto/create-eventos-orcamento.dto';
import {
  EventoOrcamento,
  EventoOrcamentoDocument,
} from './schemas/evento-orcamento.schema';

@Injectable()
export class EventosOrcamentosService {
  constructor(
    @InjectModel(EventoOrcamento.name)
    private readonly eventoOrcamentoModel: Model<EventoOrcamentoDocument>,
  ) {}

  async create(createEventosOrcamentoDto: CreateEventosOrcamentoDto) {
    const evento = await this.eventoOrcamentoModel.create({
      ...createEventosOrcamentoDto,
      dataEvento: new Date(createEventosOrcamentoDto.dataEvento),
    });

    return this.toResponse(evento);
  }

  private toResponse(evento: EventoOrcamentoDocument) {
    return {
      id: evento._id.toString(),
      cliente: evento.cliente,
      dataEvento: evento.dataEvento,
      turno: evento.turno,
      cidade: evento.cidade,
      bairro: evento.bairro,
      tipoLocal: evento.tipoLocal,
      qtdPessoas: evento.qtdPessoas,
      ocasiao: evento.ocasiao,
      estruturaCozinha: evento.estruturaCozinha,
      restricoesAlimentares: evento.restricoesAlimentares,
      menu: evento.menu,
      personalizacaoServico: evento.personalizacaoServico,
      valorEstimadoTotal: evento.valorEstimadoTotal,
      status: evento.status,
    };
  }
}
