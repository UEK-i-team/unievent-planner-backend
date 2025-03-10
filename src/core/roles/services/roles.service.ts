import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
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

  async deleteRole(roleOrId: string): Promise<Role> {
    let deletedRole: Role | null = null;

    if (isValidObjectId(roleOrId)) {
      deletedRole = await this.roleModel.findByIdAndDelete(roleOrId).exec();
    } else {
      deletedRole = await this.roleModel
        .findOneAndDelete({ code: roleOrId })
        .exec();
    }

    if (!deletedRole) {
      if (!deletedRole) {
        throw new NotFoundException(`Nie znaleziono roli ${roleOrId}`);
      }
      return deletedRole;
    }

    return deletedRole;
  }
  async getAllRoles(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }
}
