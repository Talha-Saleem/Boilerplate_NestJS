import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, JobsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
