import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class JoinGroupDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;
  //TODO: change match & length decorator to use appfield contraints
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(/^[aA-z0-9-]+$/)
  code!: string;
}
