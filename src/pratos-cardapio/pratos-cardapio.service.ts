import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePratosCardapioDto } from './dto/create-pratos-cardapio.dto';
import { UpdatePratosCardapioDto } from './dto/update-pratos-cardapio.dto';
import { FilterPratosCardapioDto } from './dto/filter-pratos-cardapio.dto';
import {
  CategoriaPrato,
  PratoCardapio,
  PratoCardapioDocument,
} from './schemas/prato-cardapio.schema';

const MENU_CATEGORY_CONFIG: Record<
  CategoriaPrato,
  { title: string; prompt: string; icon: string }
> = {
  [CategoriaPrato.COLD_STARTER]: {
    title: 'Entrada Fria',
    prompt: 'vamos começar a montar seu banquete. Escolha a sua entrada fria.',
    icon: 'Leaf',
  },
  [CategoriaPrato.HOT_STARTER]: {
    title: 'Entrada Quente',
    prompt:
      'agora escolha a entrada quente para abrir a experiência com conforto.',
    icon: 'Soup',
  },
  [CategoriaPrato.MAIN_COURSE]: {
    title: 'Prato Principal',
    prompt:
      'chegamos ao prato principal. Qual caminho combina mais com a sua celebracao?',
    icon: 'Utensils',
  },
  [CategoriaPrato.DESSERT]: {
    title: 'Sobremesa',
    prompt:
      'para fechar, escolha a sobremesa que vai deixar a última memória da noite.',
    icon: 'Sparkles',
  },
};

@Injectable()
export class PratosCardapioService {
  constructor(
    @InjectModel(PratoCardapio.name)
    private readonly pratoCardapioModel: Model<PratoCardapioDocument>,
  ) {}

  async create(createPratosCardapioDto: CreatePratosCardapioDto) {
    const prato = await this.pratoCardapioModel.create({
      nome: createPratosCardapioDto.nome,
      slug: createPratosCardapioDto.slug,
      categoria: createPratosCardapioDto.categoria,
      descricao: createPratosCardapioDto.descricao,
      perfilAlimentar: createPratosCardapioDto.perfilAlimentar ?? [],
      estilo: createPratosCardapioDto.estilo ?? [],
      imagem: createPratosCardapioDto.imagem,
      custoAdicional: createPratosCardapioDto.custoAdicional ?? 0,
      pratoDestaque: createPratosCardapioDto.pratoDestaque ?? false,
      status: createPratosCardapioDto.status ?? true,
    });

    return this.toResponse(prato);
  }

  async getMenuOptions() {
    const pratos = await this.pratoCardapioModel
      .find({ status: true })
      .sort({ nome: 1 })
      .exec();

    const menuOptions = (
      Object.values(CategoriaPrato) as CategoriaPrato[]
    ).reduce(
      (acc, categoria) => {
        acc[categoria] = {
          ...MENU_CATEGORY_CONFIG[categoria],
          dishes: [],
        };
        return acc;
      },
      {} as Record<
        CategoriaPrato,
        {
          title: string;
          prompt: string;
          icon: string;
          dishes: Array<{
            id: string;
            name: string;
            description?: string;
            imagem?: string;
            perfilAlimentar: string[];
            estilo: string[];
            custoAdicional: number;
            pratoDestaque: boolean;
          }>;
        }
      >,
    );

    for (const prato of pratos) {
      menuOptions[prato.categoria].dishes.push(this.toMenuDish(prato));
    }

    return menuOptions;
  }

  async findAll(filters: FilterPratosCardapioDto) {
    const query: Record<string, unknown> = {};

    if (filters.categoria) {
      query.categoria = new RegExp(
        `^${this.escapeRegex(filters.categoria)}$`,
        'i',
      );
    }

    const pratos = await this.pratoCardapioModel
      .find(query)
      .sort({
        recomendacaoChef: -1,
        nome: 1,
      })
      .exec();

    return {
      data: pratos.map((prato) => this.toResponse(prato)),
    };
  }

  async findOne(id: string) {
    this.validateObjectId(id);

    const prato = await this.pratoCardapioModel.findById(id).exec();

    if (!prato) {
      throw new NotFoundException('Prato não encontrado');
    }

    return this.toResponse(prato);
  }

  async findByIds(ids: Types.ObjectId[]) {
    return this.pratoCardapioModel.find({ _id: { $in: ids } }).exec();
  }

  async update(id: string, updatePratosCardapioDto: UpdatePratosCardapioDto) {
    this.validateObjectId(id);

    const prato = await this.pratoCardapioModel
      .findByIdAndUpdate(id, updatePratosCardapioDto, {
        new: true,
      })
      .exec();

    if (!prato) {
      throw new NotFoundException('Prato não encontrado');
    }

    return this.toResponse(prato);
  }

  async remove(id: string) {
    this.validateObjectId(id);

    const prato = await this.pratoCardapioModel.findByIdAndDelete(id).exec();

    if (!prato) {
      throw new NotFoundException('Prato não encontrado');
    }

    return {
      message: 'Prato removido com sucesso',
    };
  }

  async bulkUpsert(menuOptions: Record<string, any>) {
    const ops: Array<Promise<any>> = [];

    const mapping: Record<string, string> = {
      coldStarter: 'coldStarter',
      hotStarter: 'hotStarter',
      mainCourse: 'mainCourse',
      dessert: 'dessert',
    };

    for (const [categoryKey, cat] of Object.entries(menuOptions)) {
      const categoria = mapping[categoryKey] ?? categoryKey;
      for (const dish of (cat as any).dishes || []) {
        const doc = {
          nome: dish.name,
          slug: dish.id,
          categoria,
          descricao: dish.description,
          perfilAlimentar: dish.perfilAlimentar || [],
          estilo: dish.estilo || [],
          imagem: dish.imagem,
          custoAdicional: dish.custoAdicional || 0,
          pratoDestaque: dish.pratoDestaque || false,
          status: true,
        };

        ops.push(
          this.pratoCardapioModel
            .updateOne({ slug: doc.slug }, { $set: doc }, { upsert: true })
            .exec(),
        );
      }
    }

    await Promise.all(ops);

    return { inserted: ops.length };
  }

  private toResponse(prato: PratoCardapioDocument) {
    return {
      id: prato._id.toString(),
      nome: prato.nome,
      name: prato.nome,
      slug: prato.slug,
      descricao: prato.descricao,
      description: prato.descricao,
      categoria: prato.categoria,
      perfilAlimentar: prato.perfilAlimentar ?? [],
      estilo: prato.estilo ?? [],
      imagem: prato.imagem,
      custoAdicional: prato.custoAdicional ?? 0,
      pratoDestaque: prato.pratoDestaque ?? false,
      status: prato.status,
      criadoEm: prato.createdAt,
      ultimaAtualizacao: prato.updatedAt,
    };
  }

  private toMenuDish(prato: PratoCardapioDocument) {
    return {
      id: prato.slug,
      name: prato.nome,
      description: prato.descricao,
      imagem: prato.imagem,
      perfilAlimentar: prato.perfilAlimentar ?? [],
      estilo: prato.estilo ?? [],
      custoAdicional: prato.custoAdicional ?? 0,
      pratoDestaque: prato.pratoDestaque ?? false,
    };
  }

  private validateObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID inválido');
    }
  }

  private escapeRegex(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
