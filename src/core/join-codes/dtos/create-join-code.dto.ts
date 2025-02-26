import { Expose, Type } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { SystemStatus } from '../../../libs';
import { GroupDto } from '../../groups/dtos/group.dto';
import { RoleDto } from '../../roles/dtos/role.dto';

export class CreateJoinCodeDto {
  @Expose()
  role!: string;

  @Expose()
  group!: string;

  @Expose()
  @IsDefined()
  status!: SystemStatus.ACTIVE;

  @Expose()
  usesLeft?: number;

  @Expose()
  expiresAt?: Date;

  @Expose()
  code!: string;
}
