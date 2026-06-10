import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePersonalizacoesServicoDto {
  @ApiProperty({ example: 'Mudar proteína' })
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @ApiPropertyOptional({
    example: 'Permite trocar a proteína principal do prato',
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({ example: 25.5 })
  @IsNumber()
  @Min(0)
  valorEvento!: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
