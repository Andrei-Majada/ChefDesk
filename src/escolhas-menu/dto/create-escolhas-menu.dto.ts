import { IsMongoId, IsString, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

export class CreateEscolhasMenuDto {
  @IsMongoId()
  idEvento!: Types.ObjectId;

  @IsMongoId()
  idPrato!: Types.ObjectId;

  @IsString()
  @MaxLength(50)
  tipoEscolha!: string;
}