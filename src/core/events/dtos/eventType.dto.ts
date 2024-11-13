import { Expose } from 'class-transformer';
import { EventTypeColor } from 'src/libs/shared/enums/event-type-color.enum';
import { EventType } from 'src/libs/shared/enums/event-type.enum';

export class EventTypeDto {
  @Expose()
  color!: EventTypeColor;

  @Expose()
  type!: EventType;
}
