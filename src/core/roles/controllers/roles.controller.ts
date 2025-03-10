import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';
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
  @Delete(':roleOrId')
  async deleteRole(@Param('roleOrId') roleOrId: string): Promise<Role> {
    return this.rolesService.deleteRole(roleOrId);
  }
  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }
}
