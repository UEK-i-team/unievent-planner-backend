import { Optional } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { FieldConstraints } from 'src/libs';

export class CreateGroupDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(FieldConstraints.NAME.MAX_LENGTH)
  name!: string;

  @Expose()
  @Optional()
  @IsString()
  @MaxLength(FieldConstraints.COURSE_NAME.MAX_LENGTH)
  courseName?: string;

  @Expose()
  @Optional()
  @IsString()
  @MaxLength(FieldConstraints.DESCRIPTION.MAX_LENGTH)
  description?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  avatarUrl!: string;
}
