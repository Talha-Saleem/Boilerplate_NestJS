import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class JobDtoReq {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  userID: string;
}
