import { Module } from '@nestjs/common';
import {
  FIREBASE_DB,
  firebaseDbFactory,
} from './factories/firebase-db.factory';

@Module({
  providers: [
    {
      provide: FIREBASE_DB,
      useFactory: firebaseDbFactory,
    },
  ],
  exports: [FIREBASE_DB],
})
export class FirebaseModule {}
