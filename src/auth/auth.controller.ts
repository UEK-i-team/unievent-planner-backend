import {
  Controller,
  Post,
  Headers,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as admin from 'firebase-admin';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify-token')
  @HttpCode(HttpStatus.OK)
  async verifyToken(
    @Headers('Authorization') authorization: string,
    @Req() request: Request,
  ): Promise<{ decodedToken: admin.auth.DecodedIdToken }> {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token is required');
    }
    const token = authorization.replace('Bearer ', '');
    const decodedToken = await this.authService.verifyToken(token, request);
    // console.log('token', decodedToken);

    return {
      decodedToken: decodedToken as unknown as admin.auth.DecodedIdToken,
    };
  }
}
