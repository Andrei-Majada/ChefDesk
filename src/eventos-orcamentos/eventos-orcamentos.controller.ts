import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EventosOrcamentosService } from './eventos-orcamentos.service';
import { CreateEventosOrcamentoDto } from './dto/create-eventos-orcamento.dto';

@ApiTags('Eventos Orçamentos')
@Controller('eventos-orcamentos')
export class EventosOrcamentosController {
  constructor(
    private readonly eventosOrcamentosService: EventosOrcamentosService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar evento/orçamento',
    description: 'Salva os dados do evento preenchidos pelo usuário.',
  })
  @ApiBody({
    type: () => CreateEventosOrcamentoDto,
  })
  @ApiCreatedResponse({
    description: 'Evento salvo com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'Erro de validação dos dados enviados.',
  })
  create(@Body() createEventosOrcamentoDto: CreateEventosOrcamentoDto) {
    return this.eventosOrcamentosService.create(createEventosOrcamentoDto);
  }

  @Get(':id/resumo')
  @ApiOperation({
    summary: 'Obter resumo do orçamento',
    description: 'Retorna um resumo do orçamento do evento.',
  })
  @ApiOkResponse({
    description: 'Resumo do orçamento retornado com sucesso.',
  })
  @ApiBadRequestResponse({
    description: 'ID do evento inválido.',
  })
  getResumo(@Param('id') id: string) {
    return this.eventosOrcamentosService.getResumo(id);
  }
}