import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Orcamento,
  OrcamentoDocument,
  StatusOrcamento,
} from './schemas/orcamento.schema';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { OrcamentoInput } from './types/orcamento-input.type';

type FindAllFilters = {
  status?: string;
  whatsapp?: string;
};

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

  async findAll(filters: FindAllFilters): Promise<OrcamentoDocument[]> {
    const query: Record<string, any> = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.whatsapp) {
      query['cliente.whatsapp'] = filters.whatsapp;
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
