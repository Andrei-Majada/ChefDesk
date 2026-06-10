import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PratosCardapioService } from './pratos-cardapio.service';
import { CreatePratosCardapioDto } from './dto/create-pratos-cardapio.dto';
import { UpdatePratosCardapioDto } from './dto/update-pratos-cardapio.dto';
import { FilterPratosCardapioDto } from './dto/filter-pratos-cardapio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT')
@Controller('pratos-cardapio')
export class PratosCardapioController {
  constructor(private readonly pratosCardapioService: PratosCardapioService) {}
  private readonly logger = new Logger();

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreatePratosCardapioDto,
    schema: {
      example: {
        nome: 'Carpaccio de Carne',
        slug: 'carpaccio-de-carne',
        categoria: 'COLD_STARTER',
        descricao: 'Entrada fria com fatias finas de carne',
        perfilAlimentar: ['VEGETARIANO'],
        estilo: ['ITALIANO'],
        imagem: 'https://example.com/imagem-prato.jpg',
        custoAdicional: 25.5,
        pratoDestaque: false,
        status: true,
      },
    },
  })
  create(@Body() createPratosCardapioDto: CreatePratosCardapioDto) {
    console.log('TESTE');
    this.logger.debug('Criando novo prato no cardápio', {
      createPratosCardapioDto,
    });
    return this.pratosCardapioService.create(createPratosCardapioDto);
  }

  @Get('menu-options')
  getMenuOptions() {
    return this.pratosCardapioService.getMenuOptions();
  }

  @Get()
  findAll(@Query() filters: FilterPratosCardapioDto) {
    return this.pratosCardapioService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pratosCardapioService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: UpdatePratosCardapioDto,
    schema: {
      example: {
        nome: 'Carpaccio de Carne Atualizado',
        descricao: 'Descrição atualizada da entrada',
        custoAdicional: 30.0,
        status: true,
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updatePratosCardapioDto: UpdatePratosCardapioDto,
  ) {
    return this.pratosCardapioService.update(id, updatePratosCardapioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pratosCardapioService.remove(id);
  }
}
