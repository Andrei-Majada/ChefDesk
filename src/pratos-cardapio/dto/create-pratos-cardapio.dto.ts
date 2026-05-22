import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CategoriaPrato } from '../schemas/prato-cardapio.schema';

export class CreatePratosCardapioDto {
  @ApiProperty({ example: 'Carpaccio de Carne' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome!: string;

  @ApiProperty({ example: 'carpaccio-carne' })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiProperty({ example: CategoriaPrato.COLD_STARTER, enum: CategoriaPrato })
  @IsEnum(CategoriaPrato)
  categoria!: CategoriaPrato;

  @ApiPropertyOptional({ example: 'Entrada fria com carpaccio de carne.' })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiPropertyOptional({ example: ['Clássico', 'Leve'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
