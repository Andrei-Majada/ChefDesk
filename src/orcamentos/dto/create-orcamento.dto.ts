import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatusOrcamento } from '../schemas/orcamento.schema';

class ClienteResumoDto {
  @ApiProperty({ example: 'Andrei Majada' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nome!: string;

  @ApiProperty({ example: '53991473935' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  whatsapp!: string;

  @ApiPropertyOptional({ example: 'andrei@email.com' })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  email?: string;
}

class RestricoesAlimentaresDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  possuiRestricoes!: boolean;

  @ApiProperty({ example: [] })
  @IsArray()
  itens!: string[];

  @ApiPropertyOptional({ example: 'Sem camarão.' })
  @IsString()
  @IsOptional()
  observacoes?: string;
}

class MenuSelecionadoDto {
  @ApiPropertyOptional({ example: 'carpaccio-carne' })
  @IsString()
  @IsOptional()
  coldStarter?: string;

  @ApiPropertyOptional({ example: 'caldinho-camarao' })
  @IsString()
  @IsOptional()
  hotStarter?: string;

  @ApiPropertyOptional({ example: 'risoto-abobora' })
  @IsString()
  @IsOptional()
  mainCourse?: string;

  @ApiPropertyOptional({ example: 'panna-cotta' })
  @IsString()
  @IsOptional()
  dessert?: string;
}

class PersonalizacaoServicoDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  temDecoracao!: boolean;

  @ApiProperty({ example: 2 })
  @IsNumber()
  qtdGarcons!: number;

  @ApiProperty({ example: 240 })
  @IsNumber()
  custoGarcons!: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  mudouProteina!: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  duplicarPrato!: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  tempoAdicional!: boolean;

  @ApiPropertyOptional({ example: 'hotStarter' })
  @IsString()
  @IsOptional()
  categoriaDuplicada?: string;
}

export class CreateOrcamentoDto {
  @ApiProperty({
    type: ClienteResumoDto,
    example: {
      nome: 'Andrei Majada',
      whatsapp: '53991473935',
      email: 'andrei@email.com',
    },
  })
  @ValidateNested()
  @Type(() => ClienteResumoDto)
  cliente!: ClienteResumoDto;

  @ApiProperty({ example: '2026-05-29T03:00:00.000Z' })
  @IsDateString()
  dataEvento!: string;

  @ApiPropertyOptional({ example: 'dinner' })
  @IsString()
  @IsOptional()
  turno?: string;

  @ApiProperty({ example: 'João Pessoa' })
  @IsString()
  @IsNotEmpty()
  cidade!: string;

  @ApiPropertyOptional({ example: 'Tambaú' })
  @IsString()
  @IsOptional()
  bairro?: string;

  @ApiProperty({ example: 'apartment' })
  @IsString()
  @IsNotEmpty()
  tipoLocal!: string;

  @ApiProperty({ example: 12 })
  @IsNumber()
  qtdPessoas!: number;

  @ApiPropertyOptional({ example: 'Aniversário' })
  @IsString()
  @IsOptional()
  ocasiao?: string;

  @ApiProperty({ example: ['fridge', 'stove', 'counter'] })
  @IsArray()
  estruturaCozinha!: string[];

  @ApiProperty({
    type: RestricoesAlimentaresDto,
    example: {
      possuiRestricoes: true,
      itens: ['Sem lactose', 'Sem glúten'],
      observacoes: 'Cliente evita frutos do mar.',
    },
  })
  @ValidateNested()
  @Type(() => RestricoesAlimentaresDto)
  restricoesAlimentares!: RestricoesAlimentaresDto;

  @ApiProperty({
    type: MenuSelecionadoDto,
    example: {
      coldStarter: 'carpaccio-carne',
      hotStarter: 'caldinho-camarao',
      mainCourse: 'risoto-abobora',
      dessert: 'panna-cotta',
    },
  })
  @ValidateNested()
  @Type(() => MenuSelecionadoDto)
  menu!: MenuSelecionadoDto;

  @ApiProperty({
    type: PersonalizacaoServicoDto,
    example: {
      temDecoracao: true,
      qtdGarcons: 2,
      custoGarcons: 240,
      mudouProteina: true,
      duplicarPrato: false,
      tempoAdicional: true,
      categoriaDuplicada: 'mainCourse',
    },
  })
  @ValidateNested()
  @Type(() => PersonalizacaoServicoDto)
  personalizacaoServico!: PersonalizacaoServicoDto;

  @ApiProperty({ example: 4330 })
  @IsNumber()
  valorEstimadoTotal!: number;

  @ApiPropertyOptional({ example: StatusOrcamento.NOVO, enum: StatusOrcamento })
  @IsEnum(StatusOrcamento)
  @IsOptional()
  status?: StatusOrcamento;
}
