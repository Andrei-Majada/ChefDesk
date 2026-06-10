import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description: 'Email ou username do usuário',
  })
  @IsString()
  emailOrUsername!: string;

  @ApiProperty({ example: 'admin123456', description: 'Senha do usuário' })
  @IsString()
  password!: string;
}
