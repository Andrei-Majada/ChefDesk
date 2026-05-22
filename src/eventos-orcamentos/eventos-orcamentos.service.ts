import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EscolhasMenuService } from '../escolhas-menu/escolhas-menu.service';
import { PratosCardapioService } from '../pratos-cardapio/pratos-cardapio.service';
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
    private readonly escolhasMenuService: EscolhasMenuService,
    private readonly pratosCardapioService: PratosCardapioService,
  ) {}

  async create(createEventosOrcamentoDto: CreateEventosOrcamentoDto) {
    const evento = await this.eventoOrcamentoModel.create({
      ...createEventosOrcamentoDto,
      dataEvento: new Date(createEventosOrcamentoDto.dataEvento),
    });

    return this.toResponse(evento);
  }

  async getResumo(idEvento: string) {
    const evento = await this.eventoOrcamentoModel
      .findById(new Types.ObjectId(idEvento))
      .exec();

    const escolhas = await this.escolhasMenuService.findByEventoId(idEvento);

    const pratosIds = escolhas.map((escolha) => escolha.idPrato);
    const pratos = await this.pratosCardapioService.findByIds(pratosIds);

    const pratosMap = new Map(
      pratos.map((prato) => [prato._id.toString(), prato]),
    );

    const itensEscolhidos = escolhas.map((escolha) => {
      const prato = pratosMap.get(escolha.idPrato.toString());
      return {
        id: escolha._id.toString(),
        idPrato: escolha.idPrato.toString(),
        nomePrato: prato ? prato.nome : 'Prato não encontrado',
        tipoEscolha: escolha.tipoEscolha,
      };
    });

    return {
      evento: this.toResponse(evento),
      itensEscolhidos,
      resumoGeral: {
        // TODO: Implementar a lógica de resumo geral
      },
    };
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