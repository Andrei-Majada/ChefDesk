import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class EventDto {
  @ApiPropertyOptional({ example: ['fridge', 'stove', 'counter'] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  kitchenItems?: string[];

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  hasDecoration?: boolean;

  @ApiPropertyOptional({ example: 3 })
  @IsNumber()
  @IsOptional()
  waiterCount?: number;

  @ApiPropertyOptional({ example: 120 })
  @IsNumber()
  @IsOptional()
  waiterCost?: number;

  @ApiPropertyOptional({ example: ['gluten-free', 'vegetarian'] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  dietaryRestrictions?: string[];

  @ApiPropertyOptional({ example: 'Sem lactose' })
  @IsString()
  @IsOptional()
  dietaryNotes?: string;

  @ApiPropertyOptional({ example: '2026-10-10' })
  @IsString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({ example: 'night' })
  @IsString()
  @IsOptional()
  shift?: string;

  @ApiPropertyOptional({ example: 'São Paulo' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'Pinheiros' })
  @IsString()
  @IsOptional()
  neighborhood?: string;

  @ApiPropertyOptional({ example: 'apartment' })
  @IsString()
  @IsOptional()
  locationType?: string;

  @ApiPropertyOptional({ example: 'Casamento' })
  @IsString()
  @IsOptional()
  occasion?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  hasDietaryRestrictions?: boolean;
}

class UpsellDto {
  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  proteinUpgrade?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  duplicateDish?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  additionalTime?: boolean;

  @ApiPropertyOptional({ example: 'mainCourse' })
  @IsString()
  @IsOptional()
  duplicateCategory?: string;
}

export class CreateCalculateDto {
  @ApiPropertyOptional({ example: 20 })
  @IsNumber()
  @IsOptional()
  guests?: number;

  @ApiPropertyOptional({
    type: EventDto,
    example: {
      kitchenItems: ['fridge', 'stove', 'counter'],
      hasDecoration: true,
      waiterCount: 3,
      waiterCost: 120,
      dietaryRestrictions: ['gluten-free', 'vegetarian'],
      dietaryNotes: 'Sem lactose',
      date: '2026-10-10',
      shift: 'night',
      city: 'São Paulo',
      neighborhood: 'Pinheiros',
      locationType: 'apartment',
      occasion: 'Casamento',
      hasDietaryRestrictions: true,
    },
  })
  @ValidateNested()
  @Type(() => EventDto)
  @IsOptional()
  event?: EventDto;

  @ApiPropertyOptional({
    type: UpsellDto,
    example: {
      proteinUpgrade: true,
      duplicateDish: false,
      additionalTime: true,
      duplicateCategory: 'mainCourse',
    },
  })
  @ValidateNested()
  @Type(() => UpsellDto)
  @IsOptional()
  upsell?: UpsellDto;

  @ApiPropertyOptional({ example: 70 })
  @IsNumber()
  @IsOptional()
  basePerPerson?: number;
}
