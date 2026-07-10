import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrcamentoResponseDto } from './dto/orcamento-response.dto';
import { OrcamentosService } from './orcamentos.service';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { FindOrcamentosQueryDto } from './dto/find-orcamentos-query.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';
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
  findAll(@Query() query: FindOrcamentosQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: OrcamentoResponseDto })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOkResponse({ type: OrcamentoResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateOrcamentoDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusOrcamentoDto) {
    return this.service.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOkResponse({ type: OrcamentoResponseDto })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
