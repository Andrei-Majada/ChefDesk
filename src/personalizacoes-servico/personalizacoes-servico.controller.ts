import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PersonalizacoesServicoService } from './personalizacoes-servico.service';
import { CreatePersonalizacoesServicoDto } from './dto/create-personalizacoes-servico.dto';
import { UpdatePersonalizacoesServicoDto } from './dto/update-personalizacoes-servico.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT')
@Controller('personalizacoes-servico')
export class PersonalizacoesServicoController {
  constructor(
    private readonly personalizacoesServicoService: PersonalizacoesServicoService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: CreatePersonalizacoesServicoDto,
    schema: {
      example: {
        nome: 'Mudar proteína',
        descricao: 'Permite trocar a proteína principal do prato',
        valorEvento: 25.5,
        status: true,
      },
    },
  })
  create(
    @Body() createPersonalizacoesServicoDto: CreatePersonalizacoesServicoDto,
  ) {
    return this.personalizacoesServicoService.create(
      createPersonalizacoesServicoDto,
    );
  }

  @Get()
  findAll(
    @Query('sortBy') sortBy: string = 'nome',
    @Query('order') order: string = 'asc',
  ) {
    return this.personalizacoesServicoService.findAll(sortBy, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalizacoesServicoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: UpdatePersonalizacoesServicoDto,
    schema: {
      example: {
        nome: 'Trocar proteína',
        descricao: 'Atualiza o texto de descrição',
        valorEvento: 30.0,
        status: false,
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updatePersonalizacoesServicoDto: UpdatePersonalizacoesServicoDto,
  ) {
    return this.personalizacoesServicoService.update(
      id,
      updatePersonalizacoesServicoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalizacoesServicoService.remove(id);
  }
}
