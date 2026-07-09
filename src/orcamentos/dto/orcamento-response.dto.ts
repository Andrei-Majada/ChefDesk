import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class PricingItemDto {
  @ApiProperty({ example: 'Base' })
  label!: string;

  @ApiProperty({ example: 3500 })
  value!: number;
}

class ClienteResumoDto {
  @ApiProperty({ example: 'Fulano' })
  nome!: string;

  @ApiProperty({ example: '5511999999999' })
  whatsapp!: string;

  @ApiPropertyOptional({ example: 'fulano@email.com' })
  email?: string;
}

class MenuSelecionadoDto {
  @ApiPropertyOptional({ example: 'carpaccio-carne' })
  coldStarter?: string;

  @ApiPropertyOptional({ example: 'caldinho-camarao' })
  hotStarter?: string;

  @ApiPropertyOptional({ example: 'risoto-abobora' })
  mainCourse?: string;

  @ApiPropertyOptional({ example: 'panna-cotta' })
  dessert?: string;
}

class PersonalizacaoServicoDto {
  @ApiProperty({ example: true })
  temDecoracao!: boolean;

  @ApiProperty({ example: 2 })
  qtdGarcons!: number;

  @ApiProperty({ example: 240 })
  custoGarcons!: number;

  @ApiProperty({ example: true })
  mudouProteina!: boolean;

  @ApiProperty({ example: true })
  duplicarPrato!: boolean;

  @ApiProperty({ example: true })
  tempoAdicional!: boolean;

  @ApiPropertyOptional({ example: 'hotStarter' })
  categoriaDuplicada?: string;
}

export class OrcamentoResponseDto {
  @ApiProperty({ example: '6871e3f50d5c4a1f7c445654' })
  _id!: string;

  @ApiProperty({ type: ClienteResumoDto })
  cliente!: ClienteResumoDto;

  @ApiProperty({ example: '2026-06-15T18:00:00.000Z' })
  dataEvento!: string;

  @ApiPropertyOptional({ example: 'dinner' })
  turno?: string;

  @ApiProperty({ example: 'João Pessoa' })
  cidade!: string;

  @ApiPropertyOptional({ example: 'Tambaú' })
  bairro?: string;

  @ApiProperty({ example: 'apartment' })
  tipoLocal!: string;

  @ApiProperty({ example: 12 })
  qtdPessoas!: number;

  @ApiPropertyOptional({ example: 'Aniversário' })
  ocasiao?: string;

  @ApiProperty({ type: [String], example: ['fridge', 'stove', 'counter'] })
  estruturaCozinha!: string[];

  @ApiProperty({
    type: Object,
    example: {
      possuiRestricoes: true,
      itens: ['Sem camarão'],
      observacoes: 'Sem frutos do mar.',
    },
  })
  restricoesAlimentares!: any;

  @ApiProperty({
    type: MenuSelecionadoDto,
    example: {
      coldStarter: 'carpaccio-carne',
      hotStarter: 'caldinho-camarao',
      mainCourse: 'risoto-abobora',
      dessert: 'panna-cotta',
    },
  })
  menu!: MenuSelecionadoDto;

  @ApiProperty({
    type: PersonalizacaoServicoDto,
    example: {
      temDecoracao: true,
      qtdGarcons: 2,
      custoGarcons: 240,
      mudouProteina: true,
      duplicarPrato: true,
      tempoAdicional: true,
      categoriaDuplicada: 'mainCourse',
    },
  })
  personalizacaoServico!: PersonalizacaoServicoDto;

  @ApiProperty({ example: 4330 })
  valorEstimadoTotal!: number;

  @ApiPropertyOptional({ example: 3500 })
  baseCost?: number;

  @ApiPropertyOptional({ example: 830 })
  extrasCost?: number;

  @ApiPropertyOptional({ type: [PricingItemDto] })
  pricingBreakdown?: PricingItemDto[];

  @ApiProperty({ example: 'novo' })
  status!: string;

  @ApiPropertyOptional({ example: 'site' })
  origem?: string;

  @ApiProperty({ example: '2026-07-09T12:00:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-07-09T12:30:00.000Z' })
  updatedAt!: string;
}
