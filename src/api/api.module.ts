import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { PratosCardapioModule } from '../pratos-cardapio/pratos-cardapio.module';
import { OptionsModule } from '../options/options.module';

@Module({
  imports: [PratosCardapioModule, OptionsModule],
  controllers: [ApiController],
})
export class ApiModule {}
