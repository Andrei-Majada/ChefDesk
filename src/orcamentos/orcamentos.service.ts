import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Orcamento,
  OrcamentoDocument,
  StatusOrcamento,
} from './schemas/orcamento.schema';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { OrcamentoInput } from './types/orcamento-input.type';
import { PricingService } from '../pricing/pricing.service';
import { OptionsService } from '../options/options.service';

type FindAllFilters = {
  status?: string;
  whatsapp?: string;
};

@Injectable()
export class OrcamentosService {
  constructor(
    @InjectModel(Orcamento.name)
    private readonly model: Model<OrcamentoDocument>,
    private readonly pricingService: PricingService,
    private readonly optionsService: OptionsService,
  ) {}

  private async getBasePerPerson(): Promise<number> {
    const options = await this.optionsService.getOptions();
    const currentOptions = options?.[0];
    return currentOptions?.pricing?.perPerson ?? 220;
  }

  async create(
    dto: CreateOrcamentoDto | OrcamentoInput,
  ): Promise<OrcamentoDocument> {
    // Recalculate pricing server-side using the current per-person value from the database.
    let calc: any = null;
    try {
      const basePerPerson = await this.getBasePerPerson();

      calc = await this.pricingService.calculate({
        guests: (dto as any).qtdPessoas,
        event: {
          hasDecoration: (dto as any).personalizacaoServico?.temDecoracao,
          waiterCount: (dto as any).personalizacaoServico?.qtdGarcons,
          waiterCost: (dto as any).personalizacaoServico?.custoGarcons,
        },
        upsell: {
          proteinUpgrade: (dto as any).personalizacaoServico?.mudouProteina,
          duplicateDish: (dto as any).personalizacaoServico?.duplicarPrato,
          additionalTime: (dto as any).personalizacaoServico?.tempoAdicional,
        },
        basePerPerson,
      });

      const providedTotal = (dto as any).valorEstimadoTotal;
      if (typeof providedTotal === 'number' && providedTotal < calc.baseCost) {
        throw new BadRequestException(
          `Valor estimado total inválido. O custo base mínimo é ${calc.baseCost} com ${
            (dto as any).qtdPessoas || 0
          } pessoas e R$ ${basePerPerson} por pessoa.`,
        );
      }
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw err;
      }
      // ignore pricing errors and proceed with provided value
    }

    const payload: any = {
      ...dto,
      dataEvento: new Date(dto.dataEvento),
      status: dto.status ?? StatusOrcamento.NOVO,
    };

    if (calc) {
      payload.valorEstimadoTotal = calc.totalCost;
      payload.baseCost = calc.baseCost;
      payload.extrasCost = calc.extrasTotal;
      payload.pricingBreakdown = calc.breakdown;
    }

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
