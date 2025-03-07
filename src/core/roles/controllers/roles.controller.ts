import { Controller, Post, Body } from '@nestjs/common';
import { RoleService } from '../services/roles.service';
import { RoleDto } from '../dtos/role.dto';
import { Role } from 'src/models/role.model';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  async createRole(@Body() roleDto: RoleDto): Promise<Role> {
    return this.rolesService.createRole(roleDto);
  }
}
