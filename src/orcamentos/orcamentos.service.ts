import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Orcamento,
  OrcamentoDocument,
  StatusOrcamento,
} from './schemas/orcamento.schema';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { FindOrcamentosQueryDto } from './dto/find-orcamentos-query.dto';
import { OrcamentoInput } from './types/orcamento-input.type';

@Injectable()
export class OrcamentosService {
  constructor(
    @InjectModel(Orcamento.name)
    private readonly model: Model<OrcamentoDocument>,
  ) {}
  async create(
    dto: CreateOrcamentoDto | OrcamentoInput,
  ): Promise<OrcamentoDocument> {
    const payload: any = {
      ...dto,
      dataEvento: new Date(dto.dataEvento),
      status: dto.status ?? StatusOrcamento.NOVO,
    };

    return this.model.create(payload);
  }

  async findAll(filters: FindOrcamentosQueryDto): Promise<OrcamentoDocument[]> {
    const query: Record<string, any> = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.whatsapp) {
      query['cliente.whatsapp'] = filters.whatsapp;
    }

    if (filters.clienteNome) {
      query['cliente.nome'] = { $regex: filters.clienteNome, $options: 'i' };
    }

    if (filters.cidade) {
      query.cidade = { $regex: filters.cidade, $options: 'i' };
    }

    if (filters.origem) {
      query.origem = { $regex: filters.origem, $options: 'i' };
    }

    if (filters.ocasiao) {
      query.ocasiao = { $regex: filters.ocasiao, $options: 'i' };
    }

    if (filters.dataEventoFrom || filters.dataEventoTo) {
      query.dataEvento = {};

      if (filters.dataEventoFrom) {
        query.dataEvento.$gte = new Date(filters.dataEventoFrom);
      }

      if (filters.dataEventoTo) {
        query.dataEvento.$lte = new Date(filters.dataEventoTo);
      }
    }

    if (filters.valorMin !== undefined || filters.valorMax !== undefined) {
      query.valorEstimadoTotal = {};

      if (filters.valorMin !== undefined) {
        query.valorEstimadoTotal.$gte = filters.valorMin;
      }

      if (filters.valorMax !== undefined) {
        query.valorEstimadoTotal.$lte = filters.valorMax;
      }
    }

    return this.model.find(query).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<OrcamentoDocument> {
    const orcamento = await this.model.findById(id).exec();

    if (!orcamento) {
      throw new NotFoundException('Orçamento não encontrado.');
    }

    return orcamento;
  }

  async updateStatus(
    id: string,
    status: StatusOrcamento,
  ): Promise<OrcamentoDocument> {
    const orcamento = await this.model
      .findByIdAndUpdate(
        id,
        {
          $set: {
            status,
          },
        },
        {
          new: true,
        },
      )
      .exec();

    if (!orcamento) {
      throw new NotFoundException('Orçamento não encontrado.');
    }

    return orcamento;
  }
}
