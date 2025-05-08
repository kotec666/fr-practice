import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { ERRORS } from '../validator.factory';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string | undefined = request.cookies['token'];
    if (!token)
      throw new HttpException(ERRORS.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    const tokenData = this.authService.decodeJWTToken(token);

    if (!tokenData.id) return false;

    const user = (await this.usersService.findOne(
      parseInt(tokenData.id),
    )) as unknown as User;

    if (!user) return false;

    request.user = user;
    return true;
  }
}
