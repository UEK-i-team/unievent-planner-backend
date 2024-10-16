import { Expose, Type } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { GroupDto } from 'src/core/groups/dtos';
import { RoleDto } from 'src/core/roles/dtos';
import { BaseDto, SystemStatus } from 'src/libs';

export class JoinCodeDto extends BaseDto {
  @Expose()
  name!: string;

  @Expose()
  code!: string;

  @Expose()
  @Type(() => RoleDto)
  role!: RoleDto;

  @Expose()
  @Type(() => GroupDto)
  group!: GroupDto;

  @Expose()
  @IsDefined()
  status!: SystemStatus;

  @Expose()
  uses!: number;

  @Expose()
  usesLeft?: number;

  @Expose()
  expiresAt: Date;
}
