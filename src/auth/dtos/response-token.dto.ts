import { Expose } from 'class-transformer';
import { GroupDto } from 'src/core/groups/dtos';
import { SystemStatus } from 'src/libs/shared/enums/system-status.enum';
export class ResponseTokenDTO {
  @Expose()
  username!: string;

  @Expose()
  id!: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email!: string;

  @Expose()
  roles: string[];

  @Expose()
  groups: GroupDto[];

  @Expose()
  status: SystemStatus.ACTIVE | SystemStatus.INACTIVE;
}
