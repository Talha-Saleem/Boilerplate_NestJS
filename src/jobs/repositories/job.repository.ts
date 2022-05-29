import { firestore } from 'firebase-admin';
import Firestore = firestore.Firestore;
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { JobDtoReq } from '../dto/request/request.job.dto';
import { JobDtoRes } from '../dto/response/response.job.dto';
import { FIREBASE_DB } from '../../firebase';
import { Job } from '../model/job.model';

@Injectable()
export class JobRepository {
  private jobCollection: firestore.CollectionReference<firestore.DocumentData>;

  constructor(@Inject(FIREBASE_DB) db: Firestore) {
    this.jobCollection = db.collection('jobs');
  }
  async findAll(): Promise<JobDtoRes[]> {
    try {
      const JobsDb = await this.jobCollection
        .select('description', 'userID')
        .get();
      return JobsDb.docs.map((doc) => new JobDtoRes(doc.data()));
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async findById(id: string): Promise<JobDtoRes> {
    try {
      const JobsDb = await this.jobCollection.doc(id).get();
      if (JobsDb.data()) return new JobDtoRes(JobsDb.data());
      throw new NotFoundException();
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async createJob(body: JobDtoReq): Promise<void> {
    try {
      const newJob: Job = { ...body };
      await this.jobCollection.add(newJob);
      return;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async updateJob(id: string, body: JobDtoReq): Promise<void> {
    try {
      const updateJob: Job = { ...body };
      await this.jobCollection.doc(id).update(updateJob);
      return;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async deleteJob(id: string): Promise<void> {
    try {
      await this.jobCollection.doc(id).delete();
      return;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
