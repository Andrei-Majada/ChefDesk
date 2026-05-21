import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePratosCardapioDto {
  @IsString()
  @MaxLength(100)
  nome!: string;

  @IsString()
  @MaxLength(50)
  categoria!: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  imagem?: string;

  @IsNumber()
  @Min(0)
  preco!: number;

  @IsOptional()
  @IsBoolean()
  recomendacaoChef?: boolean;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsBoolean()
  especialidadeEstrelada?: boolean;
}
