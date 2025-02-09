import { Controller, Req } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { Post } from '@nestjs/common';
import { Request } from 'express';
import { RoleType } from 'src/libs';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('add-student-role')
  addStudentRole(@Req() req: Request): string {
    this.accountsService.addRole(RoleType.STUDENT, req.session.user.email);
    return `Student role added.`;
  }

  @Post('add-president-role')
  addPresidentRole(@Req() req: Request): string {
    this.accountsService.addRole(RoleType.PRESIDENT, req.session.user.email);
    return `President role added.`;
  }
}
