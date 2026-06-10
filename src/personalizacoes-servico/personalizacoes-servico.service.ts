import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePersonalizacoesServicoDto } from './dto/create-personalizacoes-servico.dto';
import { UpdatePersonalizacoesServicoDto } from './dto/update-personalizacoes-servico.dto';
import {
  PersonalizacaoTipo,
  PersonalizacaoTipoDocument,
} from './schemas/personalizacao-tipo.schema';

@Injectable()
export class PersonalizacoesServicoService {
  constructor(
    @InjectModel(PersonalizacaoTipo.name)
    private readonly personalizacaoTipoModel: Model<PersonalizacaoTipoDocument>,
  ) {}

  async create(
    createPersonalizacoesServicoDto: CreatePersonalizacoesServicoDto,
  ) {
    const personalizacao = await this.personalizacaoTipoModel.create({
      nome: createPersonalizacoesServicoDto.nome,
      descricao: createPersonalizacoesServicoDto.descricao,
      valorEvento: createPersonalizacoesServicoDto.valorEvento,
      status: createPersonalizacoesServicoDto.status ?? true,
    });

    return this.toResponse(personalizacao);
  }

  async findAll(sortBy: string = 'nome', order: string = 'asc') {
    const sortOrder = order.toLowerCase() === 'desc' ? -1 : 1;
    const allowedSortFields = ['nome', 'valorEvento', 'status', 'createdAt'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'nome';

    const personalizacoes = await this.personalizacaoTipoModel
      .find()
      .sort({ [sortField]: sortOrder })
      .exec();

    return {
      data: personalizacoes.map((p) => this.toResponse(p)),
    };
  }

  async findOne(id: string) {
    this.validateObjectId(id);

    const personalizacao = await this.personalizacaoTipoModel
      .findById(id)
      .exec();

    if (!personalizacao) {
      throw new NotFoundException('Personalização não encontrada');
    }

    return this.toResponse(personalizacao);
  }

  async update(
    id: string,
    updatePersonalizacoesServicoDto: UpdatePersonalizacoesServicoDto,
  ) {
    this.validateObjectId(id);

    const personalizacao = await this.personalizacaoTipoModel
      .findByIdAndUpdate(id, updatePersonalizacoesServicoDto, {
        new: true,
      })
      .exec();

    if (!personalizacao) {
      throw new NotFoundException('Personalização não encontrada');
    }

    return this.toResponse(personalizacao);
  }

  async remove(id: string) {
    this.validateObjectId(id);

    const personalizacao = await this.personalizacaoTipoModel
      .findByIdAndDelete(id)
      .exec();

    if (!personalizacao) {
      throw new NotFoundException('Personalização não encontrada');
    }

    return {
      message: 'Personalização removida com sucesso',
    };
  }

  private toResponse(personalizacao: PersonalizacaoTipoDocument) {
    return {
      id: personalizacao._id.toString(),
      nome: personalizacao.nome,
      descricao: personalizacao.descricao,
      valorEvento: personalizacao.valorEvento,
      status: personalizacao.status,
      criadoEm: personalizacao.createdAt,
      ultimaAtualizacao: personalizacao.updatedAt,
    };
  }

  private validateObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido');
    }
  }
}
