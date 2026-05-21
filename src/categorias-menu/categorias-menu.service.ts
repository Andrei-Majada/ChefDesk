import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoriaMenuDto } from './dto/create-categoria-menu.dto';
import {
  CategoriaMenu,
  CategoriaMenuDocument,
} from './schemas/categoria-menu.schema';

@Injectable()
export class CategoriasMenuService {
  constructor(
    @InjectModel(CategoriaMenu.name)
    private readonly categoriaMenuModel: Model<CategoriaMenuDocument>,
  ) {}

  async create(createCategoriaMenuDto: CreateCategoriaMenuDto) {
    const categoria = await this.categoriaMenuModel.create({
      nome: createCategoriaMenuDto.nome,
      ordemExibicao: createCategoriaMenuDto.ordemExibicao,
      status: createCategoriaMenuDto.status ?? true,
    });

    return this.toResponse(categoria);
  }

  async findAll() {
    const categorias = await this.categoriaMenuModel
      .find({
        status: true,
      })
      .sort({
        ordemExibicao: 1,
        nome: 1,
      })
      .exec();

    return {
      data: categorias.map((categoria) => this.toResponse(categoria)),
    };
  }

  private toResponse(categoria: CategoriaMenuDocument) {
    return {
      id: categoria._id.toString(),
      nome: categoria.nome,
      ordemExibicao: categoria.ordemExibicao,
      status: categoria.status,
    };
  }
}
