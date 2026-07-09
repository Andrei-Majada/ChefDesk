import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusOrcamento } from '../schemas/orcamento.schema';

export class FindOrcamentosQueryDto {
  @ApiPropertyOptional({
    example: StatusOrcamento.NOVO,
    enum: StatusOrcamento,
  })
  @IsEnum(StatusOrcamento)
  @IsOptional()
  status?: StatusOrcamento;

  @ApiPropertyOptional({ example: '53999999999' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  whatsapp?: string;

  @ApiPropertyOptional({ example: 'Fulano' })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  clienteNome?: string;

  @ApiPropertyOptional({ example: 'Joao Pessoa' })
  @IsString()
  @IsOptional()
  cidade?: string;

  @ApiPropertyOptional({ example: 'site' })
  @IsString()
  @IsOptional()
  origem?: string;

  @ApiPropertyOptional({ example: 'Aniversario' })
  @IsString()
  @IsOptional()
  ocasiao?: string;

  @ApiPropertyOptional({ example: '2026-07-01T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  dataEventoFrom?: string;

  @ApiPropertyOptional({ example: '2026-07-31T23:59:59.999Z' })
  @IsDateString()
  @IsOptional()
  dataEventoTo?: string;

  @ApiPropertyOptional({ example: 1000 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  valorMin?: number;

  @ApiPropertyOptional({ example: 5000 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  valorMax?: number;
}
