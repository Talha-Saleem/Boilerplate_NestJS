import { Injectable } from '@nestjs/common';
import { JobDtoReq } from '../dto/request/request.job.dto';
import { JobDtoRes } from '../dto/response/response.job.dto';
import { JobRepository } from '../repositories/job.repository';

@Injectable()
export class JobsService {
  constructor(private job: JobRepository) {}

  async findAll(): Promise<JobDtoRes[]> {
    return this.job.findAll();
  }

  async findById(id: string): Promise<JobDtoRes> {
    return this.job.findById(id);
  }

  async createJob(body: JobDtoReq): Promise<void> {
    return this.job.createJob(body);
  }

  async updateJob(id: string, body: JobDtoReq): Promise<void> {
    return this.job.updateJob(id, body);
  }

  async deleteJob(id: string): Promise<void> {
    return this.job.deleteJob(id);
  }
}
