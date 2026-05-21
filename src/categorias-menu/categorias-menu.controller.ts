import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriasMenuService } from './categorias-menu.service';
import { CreateCategoriaMenuDto } from './dto/create-categoria-menu.dto';

@Controller('categorias-menu')
export class CategoriasMenuController {
  constructor(private readonly categoriasMenuService: CategoriasMenuService) {}

  @Post()
  create(@Body() createCategoriaMenuDto: CreateCategoriaMenuDto) {
    return this.categoriasMenuService.create(createCategoriaMenuDto);
  }

  @Get()
  findAll() {
    return this.categoriasMenuService.findAll();
  }
}
