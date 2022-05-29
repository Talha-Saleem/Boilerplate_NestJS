import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsNotEmpty } from 'class-validator';

export class UserDtoRes {
  @ApiProperty()
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  constructor(user) {
    this.name = user.name;
    this.email = user.email;
  }
}
