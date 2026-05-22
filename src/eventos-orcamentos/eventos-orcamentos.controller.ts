import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
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
}
