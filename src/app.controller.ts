import { Controller, Get } from '@nestjs/common';
import { AppPermissions } from './libs';
import { Permissions } from './libs/shared/decorators/permissions.decorator';

@Controller()
export class AppController {
  @Get('admin-route')
  @Permissions(AppPermissions.ADMIN)
  getAdminRoute(): string {
    return 'This is an admin route';
  }

  @Get('user-route')
  @Permissions(AppPermissions.EVENTS.DISPLAY)
  getUserRoute(): string {
    return 'This is a user route';
  }
}
