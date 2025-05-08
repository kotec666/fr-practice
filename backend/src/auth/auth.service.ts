import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { ERRORS } from '../validator.factory';

@Injectable()
export class AuthService {
  createJWTToken(data: { email: string; id: number }): string {
    if (!process.env.JWT_SECRET_KEY)
      throw new HttpException(ERRORS.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    return sign(data, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 30,
    });
  }

  decodeJWTToken(token: string): JwtPayload {
    if (!process.env.JWT_SECRET_KEY)
      throw new HttpException(ERRORS.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    try {
      return verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
    } catch (e) {
      Logger.error(e);
      throw new HttpException(ERRORS.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
  }
}
