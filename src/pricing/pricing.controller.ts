import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PricingService } from './pricing.service';
import { CalculateDto } from './dto/calculate.dto';
import { CreateCalculateDto } from './dto/create-calculate.dto';
import { UpdateCalculateDto } from './dto/update-calculate.dto';

@ApiTags('Pricing')
@Controller('calculate')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  @ApiBody({ type: CreateCalculateDto })
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
  @ApiBody({ type: UpdateCalculateDto })
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
