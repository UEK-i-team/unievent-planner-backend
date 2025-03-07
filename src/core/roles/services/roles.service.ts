import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/models/role.model';
import { RoleDto } from '../dtos/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  async createRole(roleDto: RoleDto): Promise<Role> {
    const newRole = new this.roleModel();
    newRole.name = roleDto.name;
    newRole.code = roleDto.code;
    newRole.permissions = roleDto.permissions;
    newRole.status = roleDto.status;
    return newRole.save();
  }
}
