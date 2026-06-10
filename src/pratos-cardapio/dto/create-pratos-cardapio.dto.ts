import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import {
  CategoriaPrato,
  PerfilAlimentar,
  EstiloCulinario,
} from '../schemas/prato-cardapio.schema';

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

  @ApiPropertyOptional({
    example: [PerfilAlimentar.VEGETARIANO],
    enum: PerfilAlimentar,
  })
  @IsArray()
  @IsEnum(PerfilAlimentar, { each: true })
  @IsOptional()
  perfilAlimentar?: PerfilAlimentar[];

  @ApiPropertyOptional({
    example: [EstiloCulinario.ITALIANO],
    enum: EstiloCulinario,
  })
  @IsArray()
  @IsEnum(EstiloCulinario, { each: true })
  @IsOptional()
  estilo?: EstiloCulinario[];

  @ApiPropertyOptional({ example: 'https://example.com/imagem-prato.jpg' })
  @IsString()
  @IsOptional()
  imagem?: string;

  @ApiPropertyOptional({ example: 25.5 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  custoAdicional?: number;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  pratoDestaque?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
