import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UserService } from '../users/users.service';
import { verify } from '../helpers/password';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import classValidatorLikeError from '../helpers/classValidatorLikeError';
import fieldError from '../helpers/fieldError';
import { ERRORS } from '../validator.factory';
import { User } from '../entities/user.entity';

interface RequestWithUser extends Request {
  user: User;
  token?: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  // авторизация
  @Post()
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user: User = await this.usersService.findOneByEmail(
      signInUserDto.email,
    );

    if (!(await verify(signInUserDto.password, user.password)))
      throw new HttpException(
        classValidatorLikeError(
          [fieldError('password', [ERRORS.MISMATCH])],
          HttpStatus.BAD_REQUEST,
        ),
        HttpStatus.BAD_REQUEST,
      );

    res.cookie(
      'token',
      this.authService.createJWTToken({ email: user.email, id: user.id }),
      {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: true,
        httpOnly: true,
        sameSite: 'none',
      },
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete user.password;
    return user;
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('token', '', { expires: new Date(0) });
    return true;
  }

  @Get()
  @UseGuards(AuthGuard)
  // получение данных по cookie
  auth(@Req() req: RequestWithUser): User {
    return req.user;
  }
}
