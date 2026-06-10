import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.usersService.create({
        username: registerDto.username,
        email: registerDto.email,
        password: registerDto.password,
      });

      return {
        message: 'Usuário criado com sucesso',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      };
    } catch (error: any) {
      if (error.message.includes('já existe')) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const { emailOrUsername, password } = loginDto;

    // Buscar por username ou email
    let user = await this.usersService.findByUsername(emailOrUsername);
    if (!user) {
      user = await this.usersService.findByEmail(emailOrUsername);
    }

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Validar senha
    const isPasswordValid = await this.usersService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuário inativo');
    }

    // Gerar JWT
    const payload = {
      username: user.username,
      sub: user._id ? user._id.toString() : '',
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };
  }
}
