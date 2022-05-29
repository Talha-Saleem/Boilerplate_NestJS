import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail } from 'class-validator';

export class User {
  @ApiProperty()
  @IsAlpha()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  constructor(user) {
    this.name = user.name;
    this.email = user.email;
  }
}
