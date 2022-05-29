import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class JobDtoRes {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  userId: string;

  constructor(job) {
    this.description = job.description;
    this.userId = job.userID;
  }
}
