import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOptionsDto } from './dto/create-options.dto';
import { UpdateOptionsDto } from './dto/update-options.dto';
import { Options, OptionsDocument } from './schemas/options.schema';

@Injectable()
export class OptionsService {
  constructor(
    @InjectModel(Options.name)
    private readonly optionsModel: Model<OptionsDocument>,
  ) {}

  async create(dto: CreateOptionsDto) {
    return this.optionsModel.create(dto);
  }

  getOptions() {
    return this.findAll();
  }

  findAll() {
    return this.optionsModel.find().exec();
  }

  async findById(id: string) {
    const option = await this.optionsModel.findById(id).exec();

    if (!option) {
      throw new NotFoundException('Opção não encontrada.');
    }

    return option;
  }

  async update(id: string, dto: UpdateOptionsDto) {
    const option = await this.optionsModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();

    if (!option) {
      throw new NotFoundException('Opção não encontrada.');
    }

    return option;
  }

  async remove(id: string) {
    const option = await this.optionsModel.findByIdAndDelete(id).exec();

    if (!option) {
      throw new NotFoundException('Opção não encontrada.');
    }

    return option;
  }
}
