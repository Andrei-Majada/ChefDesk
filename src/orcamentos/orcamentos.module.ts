import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrcamentosController } from './orcamentos.controller';
import { OrcamentosService } from './orcamentos.service';
import { Orcamento, OrcamentoSchema } from './schemas/orcamento.schema';
import { PricingModule } from '../pricing/pricing.module';
import { OptionsModule } from '../options/options.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Orcamento.name,
        schema: OrcamentoSchema,
      },
    ]),
    PricingModule,
    OptionsModule,
  ],
  controllers: [OrcamentosController],
  providers: [OrcamentosService],
  exports: [OrcamentosService],
})
export class OrcamentosModule {}
