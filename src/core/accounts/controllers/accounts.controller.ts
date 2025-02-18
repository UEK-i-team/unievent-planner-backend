import { Controller, Req } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { Post } from '@nestjs/common';
import { Request } from 'express';
import { RoleType } from 'src/libs';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('add-student-role')
  async addStudentRole(@Req() req: Request): Promise<string> {
    return await this.accountsService.addRole(
      RoleType.STUDENT,
      req.session.user.email,
    );
  }

  @Post('add-president-role')
  async addPresidentRole(@Req() req: Request): Promise<string> {
    return await this.accountsService.addRole(
      RoleType.PRESIDENT,
      req.session.user.email,
    );
  }
}
