import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasMenuController } from './categorias-menu.controller';
import { CategoriasMenuService } from './categorias-menu.service';
import {
  CategoriaMenu,
  CategoriaMenuSchema,
} from './schemas/categoria-menu.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CategoriaMenu.name,
        schema: CategoriaMenuSchema,
      },
    ]),
  ],
  controllers: [CategoriasMenuController],
  providers: [CategoriasMenuService],
})
export class CategoriasMenuModule {}
