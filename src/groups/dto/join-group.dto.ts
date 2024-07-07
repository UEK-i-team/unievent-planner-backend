import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class JoinGroupDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
