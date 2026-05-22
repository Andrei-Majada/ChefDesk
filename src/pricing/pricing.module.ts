import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { Calculate, CalculateSchema } from './schemas/calculate.schema';
import { OptionsModule } from '../options/options.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Calculate.name,
        schema: CalculateSchema,
      },
    ]),
    OptionsModule,
  ],
  providers: [PricingService],
  controllers: [PricingController],
  exports: [PricingService],
})
export class PricingModule {}
