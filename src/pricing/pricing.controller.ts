import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PricingService } from './pricing.service';
import { CalculateDto } from './dto/calculate.dto';
import { CreateCalculateDto } from './dto/create-calculate.dto';
import { UpdateCalculateDto } from './dto/update-calculate.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT')
@ApiTags('Pricing')
@Controller('calculate')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreateCalculateDto,
    schema: {
      example: {
        guests: 20,
        event: {
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
        upsell: {
          proteinUpgrade: true,
          duplicateDish: false,
          additionalTime: true,
          duplicateCategory: 'mainCourse',
        },
        basePerPerson: 70,
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Created pricing calculation',
    type: CalculateDto,
  })
  create(@Body() dto: CreateCalculateDto) {
    return this.pricingService.create(dto);
  }

  @Get()
  @ApiOkResponse({
    description: 'List all pricing calculations',
    type: [CalculateDto],
  })
  findAll() {
    return this.pricingService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get pricing calculation by id',
    type: CalculateDto,
  })
  findById(@Param('id') id: string) {
    return this.pricingService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateCalculateDto,
    schema: {
      example: {
        guests: 25,
        basePerPerson: 75,
        event: {
          city: 'São Paulo',
          date: '2026-12-05',
          occasion: 'Aniversário',
        },
        upsell: {
          proteinUpgrade: false,
          duplicateDish: false,
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Updated pricing calculation',
    type: CalculateDto,
  })
  update(@Param('id') id: string, @Body() dto: UpdateCalculateDto) {
    return this.pricingService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted pricing calculation' })
  remove(@Param('id') id: string) {
    return this.pricingService.remove(id);
  }
}
