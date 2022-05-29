import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import Firestore = firestore.Firestore;

import { UserDtoReq } from '../dto/request/request.user.dto';
import { UserDtoV1Res } from '../dto/response/response.user-v1.dto';
import { UserDtoRes } from '../dto/response/response.user.dto';
import { User } from '../model/user.model';
import { FIREBASE_DB } from '../../firebase';

@Injectable()
export class UserRepository {
  private userCollection: firestore.CollectionReference<firestore.DocumentData>;

  constructor(@Inject(FIREBASE_DB) db: Firestore) {
    const userCollection = db.collection('users');
  }

  async findAll(name: string): Promise<UserDtoV1Res[]> {
    try {
      if (!name.length) {
        const usersDb = await this.userCollection.select('name').get();
        return usersDb.docs.map((doc) => new UserDtoV1Res(doc.data()));
      } else {
        const usersDb = await this.userCollection
          .where('name', '==', name)
          .get();
        return usersDb.docs.map((doc) => new UserDtoV1Res(doc.data()));
      }
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async findById(id: string): Promise<UserDtoRes> {
    try {
      const usersDb = await this.userCollection.doc(id).get();
      if (usersDb.data()) return new UserDtoRes(usersDb.data());
      throw new NotFoundException();
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async createUser(body: UserDtoReq): Promise<void> {
    try {
      const newUser: User = { ...body };
      await this.userCollection.add(newUser);
      return;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async updateUser(id: string, body: UserDtoReq): Promise<void> {
    try {
      const updateUser: User = { ...body };
      await this.userCollection.doc(id).update(updateUser);
      return;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.userCollection.doc(id).delete();
      return;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
