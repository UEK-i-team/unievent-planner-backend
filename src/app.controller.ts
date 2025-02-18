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

  @Get('student-route')
  @Permissions(AppPermissions.EVENTS.DISPLAY)
  getStudentRoute(): string {
    return 'This is a student route';
  }

  @Get('president-route')
  @Permissions(AppPermissions.EVENTS.MANAGE)
  getPresidentRoute(): string {
    return 'This is a president route';
  }
}
