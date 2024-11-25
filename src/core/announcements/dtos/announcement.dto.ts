import { Expose } from 'class-transformer';
import { BaseDto } from '../../../libs';

export class AnnouncementDto extends BaseDto {
  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  expiresAt?: Date;

  @Expose()
  important!: boolean;
}
