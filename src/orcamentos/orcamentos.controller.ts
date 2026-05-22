import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { OrcamentoResponseDto } from './dto/orcamento-response.dto';
import { OrcamentosService } from './orcamentos.service';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateStatusOrcamentoDto } from './dto/update-status-orcamento.dto';

@Controller('orcamentos')
@ApiTags('Orcamentos')
export class OrcamentosController {
  constructor(private readonly service: OrcamentosService) {}

  @Post()
  @ApiCreatedResponse({ type: OrcamentoResponseDto })
  create(@Body() dto: CreateOrcamentoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: OrcamentoResponseDto, isArray: true })
  findAll(
    @Query('status') status?: string,
    @Query('whatsapp') whatsapp?: string,
  ) {
    return this.service.findAll({ status, whatsapp });
  }

  @Get(':id')
  @ApiOkResponse({ type: OrcamentoResponseDto })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusOrcamentoDto) {
    return this.service.updateStatus(id, dto.status);
  }
}
