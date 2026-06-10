import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'admin', description: 'Nome de usuário' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username!: string;

  @ApiProperty({
    example: 'admin@chefdesk.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'admin123456', description: 'Senha do usuário' })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;
}
