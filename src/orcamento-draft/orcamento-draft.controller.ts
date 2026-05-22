import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrcamentoDraftsService } from './orcamento-draft.service';
import { CreateOrcamentoDraftDto } from './dto/create-orcamento-draft.dto';
import { UpdateOrcamentoDraftDto } from './dto/update-orcamento-draft.dto';

@Controller('orcamento-drafts')
export class OrcamentoDraftsController {
  constructor(private readonly service: OrcamentoDraftsService) {}

  @Post()
  create(@Body() dto: CreateOrcamentoDraftDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrcamentoDraftDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/lead')
  saveLead(@Param('id') id: string, @Body() lead: Record<string, any>) {
    return this.service.updateSection(id, 'lead', lead);
  }

  @Patch(':id/event')
  saveEvent(@Param('id') id: string, @Body() event: Record<string, any>) {
    return this.service.updateSection(id, 'event', event);
  }

  @Patch(':id/menu')
  saveMenu(@Param('id') id: string, @Body() menu: Record<string, any>) {
    return this.service.updateSection(id, 'menu', menu);
  }

  @Patch(':id/upsell')
  saveUpsell(@Param('id') id: string, @Body() upsell: Record<string, any>) {
    return this.service.updateSection(id, 'upsell', upsell);
  }

  @Post(':id/finalizar')
  finalizar(@Param('id') id: string) {
    return this.service.finalizar(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
