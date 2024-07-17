import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class JoinGroupDto {
  @IsString()
  @Expose()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  code: string;
}
