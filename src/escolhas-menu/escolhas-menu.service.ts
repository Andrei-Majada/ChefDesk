import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEscolhasMenuDto } from './dto/create-escolhas-menu.dto';
import { UpdateEscolhasMenuDto } from './dto/update-escolhas-menu.dto';
import {
  EscolhasMenu,
  EscolhasMenuDocument,
} from './schemas/escolhas-menu.schema';

@Injectable()
export class EscolhasMenuService {
  constructor(
    @InjectModel(EscolhasMenu.name)
    private readonly escolhasMenuModel: Model<EscolhasMenuDocument>,
  ) {}

  async create(createEscolhasMenuDto: CreateEscolhasMenuDto) {
    const escolha = await this.escolhasMenuModel.create({
      idEvento: new Types.ObjectId(createEscolhasMenuDto.idEvento),
      idPrato: new Types.ObjectId(createEscolhasMenuDto.idPrato),
      tipoEscolha: createEscolhasMenuDto.tipoEscolha,
    });
    return escolha;
  }

  async findAll() {
    return this.escolhasMenuModel.find().exec();
  }

  async findByEventoId(idEvento: string) {
    return this.escolhasMenuModel
      .find({ idEvento: new Types.ObjectId(idEvento) })
      .exec();
  }

  async findOne(id: string) {
    return this.escolhasMenuModel.findById(new Types.ObjectId(id)).exec();
  }

  async update(id: string, updateEscolhasMenuDto: UpdateEscolhasMenuDto) {
    return this.escolhasMenuModel
      .findByIdAndUpdate(new Types.ObjectId(id), updateEscolhasMenuDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string) {
    return this.escolhasMenuModel
      .findByIdAndDelete(new Types.ObjectId(id))
      .exec();
  }
}