import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateLeadDto {
  @ApiProperty({ example: 'Fulano' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @ApiProperty({ example: '53999999999' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  lgpdConsent!: boolean;

  @ApiProperty({ example: 'web' })
  @IsString()
  source?: string;
}
