import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PricingDto {
  @ApiPropertyOptional({ example: 35 })
  @IsNumber()
  @IsOptional()
  perPerson?: number;

  @ApiPropertyOptional({ example: 30 })
  @IsNumber()
  @IsOptional()
  waiterPer?: number;

  @ApiPropertyOptional({ example: 120 })
  @IsNumber()
  @IsOptional()
  waiterCostPer?: number;

  @ApiPropertyOptional({ example: 500 })
  @IsNumber()
  @IsOptional()
  decorationCost?: number;

  @ApiPropertyOptional({ example: 8 })
  @IsNumber()
  @IsOptional()
  proteinUpgradePer?: number;

  @ApiPropertyOptional({ example: 6 })
  @IsNumber()
  @IsOptional()
  duplicateDishPer?: number;

  @ApiPropertyOptional({ example: 150 })
  @IsNumber()
  @IsOptional()
  additionalTimePer?: number;
}

export class CreateOptionsDto {
  @ApiPropertyOptional({ example: ['fogão', 'geladeira'] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  kitchenOptions?: string[];

  @ApiPropertyOptional({ example: ['Sem camarão', 'Vegano'] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  restrictionOptions?: string[];

  @ApiPropertyOptional({ example: ['house', 'apartment'] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  locationTypes?: string[];

  @ApiPropertyOptional({ example: ['Casamento', 'Aniversário'] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  occasions?: string[];

  @ApiPropertyOptional({ example: ['proteinUpgrade', 'duplicateDish'] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  upsellOptions?: string[];

  @ApiPropertyOptional({ type: PricingDto })
  @ValidateNested()
  @Type(() => PricingDto)
  @IsOptional()
  pricing?: PricingDto;
}
