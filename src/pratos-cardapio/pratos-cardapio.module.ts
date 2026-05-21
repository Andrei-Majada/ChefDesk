import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PratosCardapioService } from './pratos-cardapio.service';
import { PratosCardapioController } from './pratos-cardapio.controller';
import {
  PratoCardapio,
  PratoCardapioSchema,
} from './schemas/prato-cardapio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PratoCardapio.name,
        schema: PratoCardapioSchema,
      },
    ]),
  ],
  controllers: [PratosCardapioController],
  providers: [PratosCardapioService],
  exports: [PratosCardapioService],
})
export class PratosCardapioModule {}