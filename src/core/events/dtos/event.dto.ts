import { Expose } from 'class-transformer';
import { BaseDto, type EventType } from '../../../libs';

export class EventDto extends BaseDto {
  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  startDate!: Date;

  @Expose()
  endDate!: Date;

  @Expose()
  groups!: string[];

  @Expose()
  type!: EventType;
}
