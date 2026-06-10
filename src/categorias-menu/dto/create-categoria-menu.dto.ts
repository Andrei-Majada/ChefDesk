import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCategoriaMenuDto {
  @ApiProperty({
    example: 'Entradas',
    description: 'Nome da categoria do menu',
  })
  @IsString()
  @MaxLength(50)
  nome!: string;

  @ApiProperty({ example: 1, description: 'Ordem de exibição da categoria' })
  @IsInt()
  @Min(1)
  ordemExibicao!: number;

  @ApiPropertyOptional({ example: true, description: 'Status da categoria' })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
