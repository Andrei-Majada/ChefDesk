import { PartialType } from '@nestjs/swagger';
import { CreatePratosCardapioDto } from './create-pratos-cardapio.dto';

export class UpdatePratosCardapioDto extends PartialType(
  CreatePratosCardapioDto,
) {}
