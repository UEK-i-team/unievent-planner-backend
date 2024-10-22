import { Expose } from 'class-transformer';
import { BaseDto } from 'src/libs';

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
