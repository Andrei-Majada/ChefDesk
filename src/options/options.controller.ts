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
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionsService } from './options.service';
import { CreateOptionsDto } from './dto/create-options.dto';
import { UpdateOptionsDto } from './dto/update-options.dto';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  @ApiBody({ type: CreateOptionsDto })
  @ApiCreatedResponse({
    description: 'Created options',
    type: CreateOptionsDto,
  })
  create(@Body() dto: CreateOptionsDto) {
    return this.optionsService.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of options', type: [CreateOptionsDto] })
  getAll() {
    return this.optionsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Single options record',
    type: CreateOptionsDto,
  })
  findById(@Param('id') id: string) {
    return this.optionsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiBody({ type: UpdateOptionsDto })
  @ApiOkResponse({ description: 'Updated options', type: CreateOptionsDto })
  update(@Param('id') id: string, @Body() dto: UpdateOptionsDto) {
    return this.optionsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOkResponse({ description: 'Deleted options' })
  remove(@Param('id') id: string) {
    return this.optionsService.remove(id);
  }
}
