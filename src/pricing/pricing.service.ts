import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCalculateDto } from './dto/create-calculate.dto';
import { UpdateCalculateDto } from './dto/update-calculate.dto';
import { Calculate, CalculateDocument } from './schemas/calculate.schema';
import { OptionsService } from '../options/options.service';

interface CalculateInput {
  guests?: number;
  event?: any;
  upsell?: any;
  basePerPerson?: number;
}

@Injectable()
export class PricingService {
  constructor(
    @InjectModel(Calculate.name)
    private readonly calculateModel: Model<CalculateDocument>,
    private readonly optionsService: OptionsService,
  ) {}

  private async getDefaults() {
    const options = await this.optionsService.getOptions();
    const current = options?.[0];

    return {
      perPerson: current?.pricing?.perPerson ?? 35,
      waiterPer: current?.pricing?.waiterPer ?? 30,
      waiterCostPer: current?.pricing?.waiterCostPer ?? 120,
      decorationCost: current?.pricing?.decorationCost ?? 500,
      proteinUpgradePer: current?.pricing?.proteinUpgradePer ?? 8,
      duplicateDishPer: current?.pricing?.duplicateDishPer ?? 6,
      additionalTimePer: current?.pricing?.additionalTimePer ?? 150,
    };
  }

  private async buildResult(input: CalculateInput) {
    const defaults = await this.getDefaults();

    const guests = input.guests ?? 1;
    const basePerPerson = input.basePerPerson ?? defaults.perPerson;

    const baseCost = basePerPerson * guests;

    const decorationCost = input.event?.hasDecoration
      ? defaults.decorationCost
      : 0;

    const waiterCount = input.event?.waiterCount ?? 1;
    const waiterCostPer = input.event?.waiterCost ?? defaults.waiterCostPer;
    const waiterCost = waiterCount * waiterCostPer;

    const proteinCost = input.upsell?.proteinUpgrade
      ? defaults.proteinUpgradePer * guests
      : 0;
    const duplicateCost = input.upsell?.duplicateDish
      ? defaults.duplicateDishPer * guests
      : 0;
    const additionalTimeCost = input.upsell?.additionalTime
      ? defaults.additionalTimePer
      : 0;

    const extrasTotal =
      decorationCost +
      waiterCost +
      proteinCost +
      duplicateCost +
      additionalTimeCost;

    const totalCost = baseCost + extrasTotal;

    const breakdown = [
      { label: 'Base por pessoa', value: baseCost },
      { label: 'Decoração', value: decorationCost },
      { label: 'Garçons', value: waiterCost },
      { label: 'Acréscimo proteína', value: proteinCost },
      { label: 'Duplicar prato', value: duplicateCost },
      { label: 'Tempo adicional', value: additionalTimeCost },
    ].filter((i) => (i.value && i.value > 0) || i.label === 'Base por pessoa');

    return {
      baseCost,
      decorationCost,
      waiterCost,
      proteinCost,
      duplicateCost,
      additionalTimeCost,
      extrasTotal,
      totalCost,
      breakdown,
    };
  }

  async calculate(input: CalculateInput) {
    return this.buildResult(input);
  }

  async create(dto: CreateCalculateDto) {
    const result = await this.buildResult(dto as CalculateInput);
    return this.calculateModel.create({ ...dto, result });
  }

  findAll() {
    return this.calculateModel.find().exec();
  }

  async findById(id: string) {
    const item = await this.calculateModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException('Cálculo não encontrado.');
    }
    return item;
  }

  async update(id: string, dto: UpdateCalculateDto) {
    const current = await this.findById(id);
    const updatedInput = { ...current.toObject(), ...dto };
    const result = await this.buildResult(updatedInput as CalculateInput);

    const item = await this.calculateModel
      .findByIdAndUpdate(id, { ...dto, result }, { new: true })
      .exec();

    if (!item) {
      throw new NotFoundException('Cálculo não encontrado.');
    }

    return item;
  }

  async remove(id: string) {
    const item = await this.calculateModel.findByIdAndDelete(id).exec();
    if (!item) {
      throw new NotFoundException('Cálculo não encontrado.');
    }
    return item;
  }
}
