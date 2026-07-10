import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriasMenuService } from './categorias-menu.service';
import { CreateCategoriaMenuDto } from './dto/create-categoria-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT')
@Controller('categorias-menu')
export class CategoriasMenuController {
  constructor(private readonly categoriasMenuService: CategoriasMenuService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiBody({
    type: CreateCategoriaMenuDto,
    schema: {
      example: {
        nome: 'Entradas',
        ordemExibicao: 1,
        status: true,
      },
    },
  })
  create(@Body() createCategoriaMenuDto: CreateCategoriaMenuDto) {
    return this.categoriasMenuService.create(createCategoriaMenuDto);
  }

  @Get()
  findAll() {
    return this.categoriasMenuService.findAll();
  }
}
