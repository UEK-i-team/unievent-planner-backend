import { Expose } from 'class-transformer';
import { BasicDto } from './basic.dto';

export abstract class AccountBasicDto extends BasicDto {
  @Expose()
  username!: string;

  @Expose()
  avatarUrl?: string;

  abstract fullName: string;

  abstract initials: string;
}
