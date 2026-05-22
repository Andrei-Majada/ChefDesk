import { PartialType } from '@nestjs/swagger';
import { CreateOrcamentoDraftDto } from './create-orcamento-draft.dto';

export class UpdateOrcamentoDraftDto extends PartialType(
  CreateOrcamentoDraftDto,
) {}
