import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrcamentoDraftsController } from './orcamento-draft.controller';
import { OrcamentoDraftsService } from './orcamento-draft.service';
import {
  OrcamentoDraft,
  OrcamentoDraftSchema,
} from './schemas/orcamento-draft.schema';
import { OrcamentosModule } from '../orcamentos/orcamentos.module';
import { LeadsModule } from '../leads/leads.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrcamentoDraft.name,
        schema: OrcamentoDraftSchema,
      },
    ]),
    OrcamentosModule,
    LeadsModule,
  ],
  controllers: [OrcamentoDraftsController],
  providers: [OrcamentoDraftsService],
})
export class OrcamentoDraftsModule {}
