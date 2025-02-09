// TODO: implement usage of permission
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  Action,
  PERMISSION_KEY,
  RequiredPermissions,
  Subject,
} from '../../shared';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  matchRoles(
    requiredPermissions: RequiredPermissions[],
    sessionPermissions: RequiredPermissions[],
  ): boolean {
    if (!sessionPermissions || !sessionPermissions.length) {
      throw new ForbiddenException('Invalid permissions');
    }
    const isAdmin = sessionPermissions.some(
      (perm) => perm.subject === Subject.ALL && perm.action === Action.MANAGE,
    );
    if (isAdmin) {
      return true;
    }
    const hasPermission = requiredPermissions.every((neededPermission) =>
      sessionPermissions.some(
        (sessionPermission) =>
          sessionPermission.subject === neededPermission.subject &&
          sessionPermission.action === neededPermission.action,
      ),
    );
    if (!hasPermission) {
      throw new ForbiddenException('Invalid permissions');
    }
    return true;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const decodedToken = await this.authService.verifyToken(token, request);
      request.user = decodedToken;
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    const requiredPermissions =
      this.reflector.get<RequiredPermissions[]>(
        PERMISSION_KEY,
        context.getHandler(),
      ) ||
      this.reflector.get<RequiredPermissions[]>(
        PERMISSION_KEY,
        context.getClass(),
      );
    if (!requiredPermissions || !requiredPermissions.length) {
      return true;
    }

    const session = request.session;
    return this.matchRoles(requiredPermissions, session.user.permissions || []);
  }
}
