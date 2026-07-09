import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LeadResponseDto {
  @ApiProperty({ example: '6871e3f50d5c4a1f7c445321' })
  _id!: string;

  @ApiProperty({ example: 'Fulano' })
  name!: string;

  @ApiProperty({ example: '53999999999' })
  phone!: string;

  @ApiProperty({ example: true })
  lgpdConsent!: boolean;

  @ApiPropertyOptional({ example: 'web' })
  source?: string;

  @ApiProperty({ example: '2026-07-09T12:00:00.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2026-07-09T12:30:00.000Z' })
  updatedAt!: string;
}
