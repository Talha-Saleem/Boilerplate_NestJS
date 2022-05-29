import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString } from 'class-validator';

export class Job {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsAlphanumeric()
  userID: string;

  constructor(job) {
    this.description = job.description;
    this.userID = job.userId;
  }
}
