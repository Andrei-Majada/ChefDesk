import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { PratosCardapioModule } from './pratos-cardapio/pratos-cardapio.module';
import { EventosOrcamentosModule } from './eventos-orcamentos/eventos-orcamentos.module';
import { EscolhasMenuModule } from './escolhas-menu/escolhas-menu.module';
import { PersonalizacoesServicoModule } from './personalizacoes-servico/personalizacoes-servico.module';
import { ConfiguracoesCockpitModule } from './configuracoes-cockpit/configuracoes-cockpit.module';
import { CategoriasMenuModule } from './categorias-menu/categorias-menu.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGO_URI'),
      }),
    }),

    ClientesModule,
    PratosCardapioModule,
    EventosOrcamentosModule,
    EscolhasMenuModule,
    PersonalizacoesServicoModule,
    ConfiguracoesCockpitModule,
    CategoriasMenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
