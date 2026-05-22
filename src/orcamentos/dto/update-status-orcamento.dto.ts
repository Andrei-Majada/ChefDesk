import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StatusOrcamento } from '../schemas/orcamento.schema';

export class UpdateStatusOrcamentoDto {
  @ApiProperty({ example: StatusOrcamento.EM_ANALISE, enum: StatusOrcamento })
  @IsEnum(StatusOrcamento)
  status!: StatusOrcamento;
}
