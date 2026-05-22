import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  OrcamentoDraft,
  OrcamentoDraftDocument,
  StatusDraft,
} from './schemas/orcamento-draft.schema';
import { CreateOrcamentoDraftDto } from './dto/create-orcamento-draft.dto';
import { UpdateOrcamentoDraftDto } from './dto/update-orcamento-draft.dto';
import { OrcamentosService } from '../orcamentos/orcamentos.service';
import { LeadsService } from '../leads/leads.service';
import { mapDraftDataToOrcamento } from './mappers/map-draft-data-to-orcamento';

@Injectable()
export class OrcamentoDraftsService {
  constructor(
    @InjectModel(OrcamentoDraft.name)
    private readonly draftModel: Model<OrcamentoDraftDocument>,
    private readonly orcamentosService: OrcamentosService,
    private readonly leadsService: LeadsService,
  ) {}

  async create(dto: CreateOrcamentoDraftDto) {
    return this.draftModel.create({
      currentStep: dto.currentStep ?? 1,
      totalScreens: dto.totalScreens ?? 24,
      isNextEnabled: dto.isNextEnabled ?? false,
      data: dto.data ?? {},
      status: StatusDraft.IN_PROGRESS,
    });
  }

  async findById(id: string) {
    const draft = await this.draftModel.findById(id).exec();

    if (!draft) {
      throw new NotFoundException('Orçamento em andamento não encontrado.');
    }

    return draft;
  }

  async update(id: string, dto: UpdateOrcamentoDraftDto) {
    const draft = await this.findById(id);

    const updateBody: Record<string, unknown> = {};

    if (dto.currentStep !== undefined) {
      updateBody.currentStep = dto.currentStep;
    }

    if (dto.totalScreens !== undefined) {
      updateBody.totalScreens = dto.totalScreens;
    }

    if (dto.isNextEnabled !== undefined) {
      updateBody.isNextEnabled = dto.isNextEnabled;
    }

    if (dto.data !== undefined) {
      updateBody.data = this.mergeDraftData(draft.data, dto.data);
    }

    const updated = await this.draftModel
      .findByIdAndUpdate(
        id,
        {
          $set: updateBody,
        },
        {
          new: true,
        },
      )
      .exec();

    if (!updated) {
      throw new NotFoundException('Orçamento em andamento não encontrado.');
    }

    return updated;
  }

  async updateSection(
    id: string,
    section: string,
    sectionData: Record<string, any>,
  ) {
    const draft = await this.findById(id);
    const data = this.mergeDraftData(draft.data, { [section]: sectionData });
    return this.update(id, { data });
  }

  private mergeDraftData(
    currentData: Record<string, any>,
    nextData: Record<string, any>,
  ): Record<string, any> {
    const merged: Record<string, any> = { ...currentData };

    for (const key of Object.keys(nextData)) {
      const nextValue = nextData[key];
      const currentValue = currentData?.[key];

      if (
        nextValue === null ||
        Array.isArray(nextValue) ||
        typeof nextValue !== 'object'
      ) {
        merged[key] = nextValue;
      } else {
        merged[key] = this.mergeDraftData(
          typeof currentValue === 'object' && currentValue !== null
            ? currentValue
            : {},
          nextValue,
        );
      }
    }

    return merged;
  }

  async finalizar(id: string) {
    const draft = await this.findById(id);

    // If draft contains lead with LGPD consent, ensure lead exists in leads collection
    try {
      const lead = draft.data?.lead;
      if (lead?.phone && lead?.lgpdConsent) {
        const existing = await this.leadsService.findByPhone(lead.phone);
        if (!existing) {
          await this.leadsService.create({
            name: lead.name ?? '',
            phone: lead.phone,
            lgpdConsent: true,
            source: 'site',
          } as any);
        }
      }
    } catch (err) {
      // non-blocking: proceed to create orcamento even if lead creation fails
    }

    const orcamentoData = mapDraftDataToOrcamento(draft.data);
    const orcamento = await this.orcamentosService.create(orcamentoData);

    await this.draftModel
      .findByIdAndUpdate(id, {
        $set: {
          status: StatusDraft.COMPLETED,
        },
      })
      .exec();

    return orcamento;
  }

  async remove(id: string) {
    const draft = await this.draftModel.findByIdAndDelete(id).exec();

    if (!draft) {
      throw new NotFoundException('Orçamento em andamento não encontrado.');
    }

    return draft;
  }
}
