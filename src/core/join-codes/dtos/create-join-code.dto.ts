import { Expose } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { SystemStatus } from '../../../libs';

export class CreateJoinCodeDto {
  @Expose()
  role!: string;

  @Expose()
  group!: string;

  @Expose()
  usesLeft?: number;

  @Expose()
  expiresAt?: Date;

  @Expose()
  code!: string;
}
