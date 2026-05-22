import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { Options, OptionsSchema } from './schemas/options.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Options.name,
        schema: OptionsSchema,
      },
    ]),
  ],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}
