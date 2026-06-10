// auth/jwt-auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    this.logger.log(
      `Passou pelo JwtAuthGuard: ${request.method} ${request.url}`,
    );
    this.logger.debug(`Authorization header: ${request.headers.authorization}`);

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    this.logger.log('Resultado do JWT Guard');
    this.logger.debug(`err: ${JSON.stringify(err)}`);
    this.logger.debug(`user: ${JSON.stringify(user)}`);
    this.logger.debug(`info: ${JSON.stringify(info)}`);

    if (err || !user) {
      this.logger.warn(
        `JWT inválido ou ausente: ${info?.message || err?.message}`,
      );
      throw err || new UnauthorizedException('Token inválido ou ausente');
    }

    return user;
  }
}
