import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PratosCardapioService } from '../pratos-cardapio/pratos-cardapio.service';
import { OptionsService } from '../options/options.service';

@ApiTags('API')
@Controller('api')
export class ApiController {
  constructor(
    private readonly pratosService: PratosCardapioService,
    private readonly optionsService: OptionsService,
  ) {}

  @Get('menu')
  async getMenu() {
    const menuOptions = await this.pratosService.getMenuOptions();

    const categories = Object.entries(menuOptions).map(([key, v]) => ({
      key,
      title: v.title,
      prompt: v.prompt,
      icon: v.icon,
      dishes: v.dishes,
    }));

    return { categories };
  }

  @Get('options')
  getOptions() {
    return this.optionsService.getOptions();
  }

  @Post('admin/seed-pratos')
  async seedPratos() {
    const menuOptions = {
      coldStarter: {
        title: 'Entrada Fria',
        prompt:
          'vamos começar a montar seu banquete. Escolha a sua entrada fria.',
        dishes: [
          {
            id: 'carpaccio-carne',
            name: 'Carpaccio de Carne',
            description:
              'Lâminas de filé mignon cru, rúcula, alcaparras, parmesão ralado e torradinhas.',
            tags: ['Classico', 'Leve'],
          },
          {
            id: 'ceviche-caju',
            name: 'Ceviche de Caju e Frutas Tropicais',
            description:
              'Cubos de caju, manga, cebola roxa, coentro, limão e chips de batata doce.',
            tags: ['Vegano', 'Sem glúten'],
          },
          {
            id: 'salada-trigo',
            name: 'Salada de Trigo e Legumes Grelhados',
            description:
              'Trigo em grãos, abobrinha, berinjela, pimentões e vinagrete de hortelã.',
            tags: ['Vegetariano'],
          },
        ],
      },
      hotStarter: {
        title: 'Entrada Quente',
        prompt:
          'agora escolha a entrada quente para abrir a experiência com conforto.',
        dishes: [
          {
            id: 'creme-mandioquinha',
            name: 'Creme de Mandioquinha',
            description:
              'Creme aveludado com azeite de ervas, crocante de alho-poró e finalização delicada.',
            tags: ['Vegetariano'],
          },
          {
            id: 'arancini-cogumelos',
            name: 'Arancini de Cogumelos',
            description:
              'Bolinho de risoto com cogumelos, queijo curado e molho fresco de tomates.',
            tags: ['Crocante'],
          },
          {
            id: 'caldinho-camarao',
            name: 'Caldinho de Camarão',
            description:
              'Caldo aromático com camarão, leite de coco, ervas frescas e toque de pimenta.',
            tags: ['Frutos do mar'],
          },
        ],
      },
      mainCourse: {
        title: 'Prato Principal',
        prompt:
          'chegamos ao prato principal. Qual caminho combina mais com a sua celebracao?',
        dishes: [
          {
            id: 'file-mignon',
            name: 'File Mignon ao Molho de Vinho',
            description:
              'File ao ponto, molho de vinho tinto, pure rustico e legumes tostados.',
            tags: ['Assinatura'],
          },
          {
            id: 'peixe-crosta',
            name: 'Peixe em Crosta de Castanhas',
            description:
              'Peixe grelhado com crosta crocante, creme de limão siciliano e arroz de ervas.',
            tags: ['Leve'],
          },
          {
            id: 'risoto-abobora',
            name: 'Risoto de Abóbora e Queijo Curado',
            description:
              'Risoto cremoso com abóbora assada, queijo curado, sementes e ervas frescas.',
            tags: ['Vegetariano'],
          },
        ],
      },
      dessert: {
        title: 'Sobremesa',
        prompt:
          'para fechar, escolha a sobremesa que vai deixar a última memória da noite.',
        dishes: [
          {
            id: 'panna-cotta',
            name: 'Panna Cotta de Baunilha',
            description:
              'Creme leve de baunilha com calda de frutas vermelhas e farofa amanteigada.',
            tags: ['Delicada'],
          },
          {
            id: 'brownie-caramelo',
            name: 'Brownie com Caramelo Salgado',
            description:
              'Brownie intenso, caramelo salgado, creme fresco e flor de sal.',
            tags: ['Chocolate'],
          },
          {
            id: 'tartelete-limao',
            name: 'Tartelete de Limão',
            description:
              'Massa crocante, creme cítrico, merengue tostado e raspas frescas.',
            tags: ['Cítrica'],
          },
        ],
      },
    } as Record<string, any>;

    return this.pratosService.bulkUpsert(menuOptions);
  }
}
