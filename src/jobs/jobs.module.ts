import { Module } from '@nestjs/common';
import { JobsController } from './controller/jobs.controller';
import { JobRepository } from './repositories/job.repository';
import { JobsService } from './service/jobs.service';
import { FirebaseModule } from '../firebase';

@Module({
  imports: [FirebaseModule],
  controllers: [JobsController],
  providers: [JobsService, JobRepository],
})
export class JobsModule {}
