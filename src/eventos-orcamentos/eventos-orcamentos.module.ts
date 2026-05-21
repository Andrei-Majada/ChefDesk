import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EscolhasMenuModule } from '../escolhas-menu/escolhas-menu.module';
import { PratosCardapioModule } from '../pratos-cardapio/pratos-cardapio.module';
import { EventosOrcamentosController } from './eventos-orcamentos.controller';
import { EventosOrcamentosService } from './eventos-orcamentos.service';
import {
  EventoOrcamento,
  EventoOrcamentoSchema,
} from './schemas/evento-orcamento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EventoOrcamento.name,
        schema: EventoOrcamentoSchema,
      },
    ]),
    EscolhasMenuModule,
    PratosCardapioModule,
  ],
  controllers: [EventosOrcamentosController],
  providers: [EventosOrcamentosService],
})
export class EventosOrcamentosModule {}