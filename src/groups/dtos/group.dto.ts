import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { SystemStatus } from 'src/libs/shared';

export class GroupDto {
  @Expose()
  name!: string;

  @Expose()
  courseName?: string;

  @Expose()
  description?: string;

  @Expose()
  avatar!: string;

  @Expose()
  code!: string;

  @IsDefined()
  @Expose()
  status!: SystemStatus;
}
