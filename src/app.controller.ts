import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  @Get('protected')
  @UseGuards(AuthGuard)
  getProtected(@Request() req): string {
    return `Hello ${req.user.name}`;
  }
}
