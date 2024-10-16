import { Expose, Type } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { JoinCodeDto } from 'src/core/join-codes/dtos';
import {
  AccountBasicDto,
  BaseDto,
  SystemStatus,
  VerificationStatus,
} from 'src/libs';

export class GroupDto extends BaseDto {
  @Expose()
  name!: string;

  @Expose()
  courseName?: string;

  @Expose()
  description?: string;

  @Expose()
  avatarUrl!: string;

  @Expose()
  code!: string;

  @IsDefined()
  @Expose()
  status!: SystemStatus;

  @IsDefined()
  @Expose()
  verificationStatus!: VerificationStatus;

  @Expose()
  rejectionReason?: string;

  @Expose()
  @Type(() => AccountBasicDto)
  president!: AccountBasicDto;

  @Expose()
  @Type(() => AccountBasicDto)
  members!: AccountBasicDto[];

  @Expose()
  @Type(() => JoinCodeDto)
  joinCodes!: JoinCodeDto[];
}
