import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { BasicDto } from './basic.dto';
import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

export abstract class AccountBasicDto extends BasicDto {
  @Expose()
  username!: string;

  @Expose()
  avatarUrl?: string;

  abstract fullName: string;

  abstract initials: string;
}
