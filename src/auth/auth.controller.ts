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
import { Request } from 'express';
import { ResponseTokenDTO } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify-token')
  @HttpCode(HttpStatus.OK)
  async verifyToken(
    @Headers('Authorization') authorization: string,
    @Req() request: Request,
  ): Promise<ResponseTokenDTO> {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token is required');
    }
    const token = authorization.replace('Bearer ', '');
    const responseToken: ResponseTokenDTO = await this.authService.verifyToken(
      token,
      request,
    );

    return responseToken;
  }
}
