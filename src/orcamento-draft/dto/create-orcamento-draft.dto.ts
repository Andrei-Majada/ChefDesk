import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsOptional } from 'class-validator';

export class CreateOrcamentoDraftDto {
  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  currentStep?: number;

  @ApiPropertyOptional({ example: 24 })
  @IsNumber()
  @IsOptional()
  totalScreens?: number;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isNextEnabled?: boolean;

  @ApiPropertyOptional({
    example: {
      guests: 12,
      lead: {
        name: 'Fulano',
        phone: '53999999999',
      },
    },
  })
  @IsObject()
  @IsOptional()
  data?: Record<string, any>;
}
