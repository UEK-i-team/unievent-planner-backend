import { Optional } from '@nestjs/common';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { GroupDto } from 'src/groups/dtos/group.dto';
import {
  AccountBasicDto,
  FieldConstraints,
  SystemStatus,
} from 'src/libs/shared';
import { PermissionRule, RoleDto } from 'src/roles/dtos/role.dto';

export class UserAccountDto extends AccountBasicDto {
  get fullName(): string | null {
    if (this.firstName && this.lastName) {
      return `${this.firstName[0].toUpperCase()}${this.lastName[0].toUpperCase()}`;
    }
    return null;
  }

  get initials(): string {
    if (this.firstName && this.lastName) {
      return `${this.firstName[0].toUpperCase()}${this.lastName[0].toUpperCase()}`;
    } else if (this.firstName) {
      return `${this.firstName[0].toUpperCase()}`;
    } else if (this.lastName) {
      return `${this.lastName[0].toUpperCase()}`;
    } else {
      return '';
    }
  }

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  email!: string;

  @Expose()
  @Type(() => RoleDto)
  role!: RoleDto[];

  @Expose()
  @Type(() => GroupDto)
  groups!: GroupDto[];

  @Expose()
  @IsDefined()
  status!: SystemStatus;
}
