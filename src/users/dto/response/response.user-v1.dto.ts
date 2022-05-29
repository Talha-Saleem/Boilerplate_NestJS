import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty } from 'class-validator';

export class UserDtoV1Res {
  @ApiProperty({ default: '' })
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  constructor(user) {
    this.name = user.name;
  }
}
