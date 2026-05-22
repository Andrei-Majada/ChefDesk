import { ApiPropertyOptional } from '@nestjs/swagger';

export class CalculateDto {
  @ApiPropertyOptional({ example: 20 })
  guests?: number;

  @ApiPropertyOptional({
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
  event?: Record<string, any>;

  @ApiPropertyOptional({
    example: {
      proteinUpgrade: true,
      duplicateDish: false,
      additionalTime: true,
      duplicateCategory: 'mainCourse',
    },
  })
  upsell?: Record<string, any>;

  @ApiPropertyOptional({ example: 70 })
  basePerPerson?: number;
}
