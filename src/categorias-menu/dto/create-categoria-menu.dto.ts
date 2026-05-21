import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCategoriaMenuDto {
  @IsString()
  @MaxLength(50)
  nome!: string;

  @IsInt()
  @Min(1)
  ordemExibicao!: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
