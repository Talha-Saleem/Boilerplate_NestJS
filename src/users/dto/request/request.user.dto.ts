import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsNotEmpty } from 'class-validator';

export class UserDtoReq {
  @ApiProperty()
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
