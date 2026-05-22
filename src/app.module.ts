import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { PratosCardapioModule } from './pratos-cardapio/pratos-cardapio.module';
import { PersonalizacoesServicoModule } from './personalizacoes-servico/personalizacoes-servico.module';
import { CategoriasMenuModule } from './categorias-menu/categorias-menu.module';
import { OrcamentoDraftsModule } from './orcamento-draft/orcamento-draft.module';
import { OrcamentosModule } from './orcamentos/orcamentos.module';
import { LeadsModule } from './leads/leads.module';
import { OptionsModule } from './options/options.module';
import { PricingModule } from './pricing/pricing.module';
import { ApiModule } from './api/api.module';
import { NotificationsModule } from './notifications/notifications.module';

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
    PersonalizacoesServicoModule,
    CategoriasMenuModule,
    OrcamentoDraftsModule,
    OrcamentosModule,
    LeadsModule,
    OptionsModule,
    PricingModule,
    ApiModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
