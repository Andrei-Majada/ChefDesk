import { Module } from '@nestjs/common';
import { EscolhasMenuService } from './escolhas-menu.service';
import { EscolhasMenuController } from './escolhas-menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EscolhasMenu,
  EscolhasMenuSchema,
} from './schemas/escolhas-menu.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EscolhasMenu.name, schema: EscolhasMenuSchema },
    ]),
  ],
  controllers: [EscolhasMenuController],
  providers: [EscolhasMenuService],
  exports: [EscolhasMenuService],
})
export class EscolhasMenuModule {}