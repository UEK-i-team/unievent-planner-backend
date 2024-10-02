import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
  
    if (!token) {
      console.error('No token provided'); 
      throw new UnauthorizedException('No token');
    }
  
    try {
      const decodedToken = await this.authService.verifyToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      console.error('Token verification failed:', error); 
      throw new UnauthorizedException('Invalid token');
    }
  }
}  
