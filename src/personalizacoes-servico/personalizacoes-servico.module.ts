import { Module } from '@nestjs/common';
import { PersonalizacoesServicoService } from './personalizacoes-servico.service';
import { PersonalizacoesServicoController } from './personalizacoes-servico.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PersonalizacaoTipo,
  PersonalizacaoTipoSchema,
} from './schemas/personalizacao-tipo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonalizacaoTipo.name, schema: PersonalizacaoTipoSchema },
    ]),
  ],
  controllers: [PersonalizacoesServicoController],
  providers: [PersonalizacoesServicoService],
})
export class PersonalizacoesServicoModule {}
