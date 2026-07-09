import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { FindLeadsQueryDto } from './dto/find-leads-query.dto';
import { LeadResponseDto } from './dto/lead-response.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Lead created',
    schema: { example: { id: '6871e3f50d5c4a1f7c445321' } },
  })
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of leads', type: [LeadResponseDto] })
  findAll(@Query() query: FindLeadsQueryDto) {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Lead details', type: LeadResponseDto })
  findById(@Param('id') id: string) {
    return this.leadsService.findById(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Lead updated',
    schema: { example: { id: '6871e3f50d5c4a1f7c445321' } },
  })
  update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.leadsService.update(id, dto);
  }
}
